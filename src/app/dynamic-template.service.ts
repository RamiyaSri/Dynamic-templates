import { Injectable } from '@angular/core';
export interface TemplateStyle {
 page: { [key: string]: string }; 
 card: { [key: string]: string };
 title: { [key: string]: string };
 label: { [key: string]: string };
 input: { [key: string]: string };
 button: { [key: string]: string };
 layout: 'single';
}

export interface FormField {
 name: string;
 label: string;
 type: 'text' | 'email' | 'tel' | 'password' | 'textarea' | 'select'|'date'|'number';
 placeholder?: string;
 options?: string[];
}
@Injectable({
 providedIn: 'root'
})
export class DynamicTemplateService {
 readonly templates: { [key: string]: TemplateStyle } = {
   'Classic Light': {
     page: {
       background: '#e9ecf0', minHeight: '100vh', display: 'flex',
       flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
       padding: '40px 16px', fontFamily: 'Georgia, serif', transition: 'all 0.4s ease'
     },
     card: {
       background: '#ffffff', borderRadius: '12px',
       boxShadow: '0 4px 32px rgb(0, 0, 0,10)', padding: '40px 44px',
       width: '100%', maxWidth: '750px', boxSizing: 'border-box'
     },
     title: { fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '28px' },
     label: {
       fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px',
       display: 'block', letterSpacing: '0.04em', textTransform: 'uppercase'
     },
     input: {
       width: '100%', padding: '10px 14px', border: '1.5px solid #cbd5e1',
       borderRadius: '8px', fontSize: '14px', outline: 'none',
       background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box',
     },
     button: {
       width: '100%', padding: '13px', background: '#2563eb', color: '#fff',
       border: 'solid 1.5px #000', borderRadius: '8px', fontSize: '15px', fontWeight: '700',
       cursor: 'pointer', marginTop: '10px'
     },
     layout: 'single'
   },
   'Modern Clean': {
     page: {
       background: '#f5f7fa', minHeight: '100vh', display: 'flex',
       flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
       padding: '40px 16px', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', transition: 'all 0.4s ease'
     },
     card: {
       background: '#ffffff', borderRadius: '16px',
       boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)', padding: '50px 40px',
       width: '100%', maxWidth: '700px', boxSizing: 'border-box'
     },
     title: { fontSize: '28px', fontWeight: '600', color: '#1a202c', marginBottom: '32px', letterSpacing: '-0.5px' },
     label: {
       fontSize: '12px', fontWeight: '500', color: '#4a5568', marginBottom: '8px',
       display: 'block', letterSpacing: '0.5px'
     },
     input: {
       width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0',
       borderRadius: '6px', fontSize: '14px', outline: 'none',
       background: '#f9fafb', color: '#1a202c', boxSizing: 'border-box', transition: 'all 0.3s ease'
     },
     button: {
       width: '100%', padding: '12px', background: '#667eea', color: '#fff',
       border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600',
       cursor: 'pointer', marginTop: '20px', transition: 'all 0.3s ease'
     },
     layout: 'single'
   },
   'Elegant Dark': {
     page: {
       background: '#1a1f2e', minHeight: '100vh', display: 'flex',
       flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
       padding: '40px 16px', fontFamily: '"Poppins", sans-serif', transition: 'all 0.4s ease'
     },
     card: {
       background: '#252d3d', borderRadius: '20px',
       boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)', padding: '50px 45px',
       width: '100%', maxWidth: '700px', boxSizing: 'border-box', border: '1px solid #3a4451'
     },
     title: { fontSize: '26px', fontWeight: '700', color: '#f0f4f8', marginBottom: '30px' },
     label: {
       fontSize: '12px', fontWeight: '600', color: '#b8c5d6', marginBottom: '8px',
       display: 'block', letterSpacing: '1px', textTransform: 'uppercase'
     },
     input: {
       width: '100%', padding: '12px 16px', border: '1px solid #3a4451',
       borderRadius: '8px', fontSize: '14px', outline: 'none',
       background: '#1f2536', color: '#e2e8f0', boxSizing: 'border-box'
     },
     button: {
       width: '100%', padding: '14px', background: '#06b6d4', color: '#0d1117',
       border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700',
       cursor: 'pointer', marginTop: '20px'
     },
     layout: 'single'
   },
   'Minimal Earthy': {
     page: {
       background: '#d4ccc4', minHeight: '100vh', display: 'flex',
       flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
       padding: '40px 16px', fontFamily: '"Lora", serif', transition: 'all 0.4s ease'
     },
     card: {
       background: '#faf8f6', borderRadius: '14px',
       boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)', padding: '50px 45px',
       width: '100%', maxWidth: '700px', boxSizing: 'border-box'
     },
     title: { fontSize: '26px', fontWeight: '600', color: '#5a4a42', marginBottom: '30px', fontStyle: 'italic' },
     label: {
       fontSize: '12px', fontWeight: '500', color: '#6b5c54', marginBottom: '8px',
       display: 'block', letterSpacing: '0.8px', fontStyle: 'italic'
     },
     input: {
       width: '100%', padding: '12px 14px', border: '1px solid #c9bbb2',
       borderRadius: '8px', fontSize: '14px', outline: 'none', fontStyle: 'italic',
       background: '#fef9f5', color: '#5a4a42', boxSizing: 'border-box'
     },
     button: {
       width: '100%', padding: '12px', background: '#a89884', color: '#faf8f6',
       border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600',
       cursor: 'pointer', marginTop: '20px', fontStyle: 'italic'
     },
     layout: 'single'
   }
 };
 getTemplateNames(): string[] {
   return Object.keys(this.templates);
 }
 getTemplate(name: string): TemplateStyle {
   return this.templates[name] || this.templates['Classic Light'];
 }
}