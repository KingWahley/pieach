'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from '@/components/shared/Icons';
import gsap from 'gsap';
import Lenis from 'lenis';

export default function Modal({ isOpen, onClose, title, children, actions }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const bodyRef = useRef(null);
  const lenisRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    setMounted(true);
    const target = document.querySelector('.dashboard-body') || document.body;
    setPortalNode(target);
  }, []);

  useEffect(() => {
    if (isOpen && mounted && backdropRef.current && modalRef.current) {
      document.body.style.overflow = 'hidden';
      gsap.set(backdropRef.current, { display: 'flex' });
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );

      if (bodyRef.current) {
        lenisRef.current = new Lenis({
          wrapper: bodyRef.current,
          content: bodyRef.current.firstElementChild,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        const raf = (time) => {
          lenisRef.current?.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    } else if (!isOpen && mounted && backdropRef.current && modalRef.current) {
      document.body.style.overflow = 'auto';
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
        if (backdropRef.current) gsap.set(backdropRef.current, { display: 'none' });
      }});
      gsap.to(modalRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3 });
      
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [isOpen, mounted]);

  if (!mounted || !portalNode) return null;

  return createPortal(
    <div className="modal-backdrop" ref={backdropRef} onClick={onClose} style={{ display: 'none' }}>
      <div className="appointment-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body" ref={bodyRef}>
          <div>
            {children}
          </div>
        </div>
        {actions && (
          <div className="modal-actions">
            {actions}
          </div>
        )}
      </div>
    </div>,
    portalNode
  );
}
