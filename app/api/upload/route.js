import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const thumbnail = formData.get('thumbnail');
    const bucket = formData.get('bucket') || 'media';
    const folder = formData.get('folder') || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Missing server credentials' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

    const fileExt = file.name.split('.').pop();
    const fileNameBase = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const fileName = `${fileNameBase}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Convert main file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage using service role key (bypasses RLS)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        duplex: 'half',
        cacheControl: '31536000' // 1 year (public, max-age=31536000, immutable)
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Upload thumbnail if provided
    if (thumbnail) {
      const thumbFileName = `${fileNameBase}_thumb.${fileExt}`;
      const thumbFilePath = folder ? `${folder}/${thumbFileName}` : thumbFileName;

      const thumbArrayBuffer = await thumbnail.arrayBuffer();
      const thumbBuffer = Buffer.from(thumbArrayBuffer);

      const { error: thumbUploadError } = await supabase.storage
        .from(bucket)
        .upload(thumbFilePath, thumbBuffer, {
          contentType: thumbnail.type,
          duplex: 'half',
          cacheControl: '31536000' // 1 year cache for thumbnails as well
        });

      if (thumbUploadError) {
        console.error('Storage thumbnail upload error (non-blocking):', thumbUploadError);
      }
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('API upload exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
