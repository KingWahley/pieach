export async function sendApprovalEmail(appt) {
  if (!appt || appt.status !== 'Approved') return;
  
  try {
    const res = await fetch('/api/appointments/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientName: appt.clientName,
        clientEmail: appt.clientEmail || appt.email,
        preferredDate: appt.preferredDate,
        preferredTime: appt.preferredTime,
        service: appt.service
      }),
    });
    const data = await res.json();
    console.log('[Email Trigger Result]', data);
  } catch (err) {
    console.error('[Failed to trigger email notification]', err);
  }
}
