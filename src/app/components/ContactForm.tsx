"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    carMake: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; carMake?: string; message?: string }>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const phoneNumber = "27670712048";

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.carMake.trim()) {
      newErrors.carMake = "Car make and model is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const text = encodeURIComponent(
      `Hello MSH Sounds!\n\nName: ${formData.name}\nCar Make & Model: ${formData.carMake}\nMessage: ${formData.message}`
    );
    
    timeoutRef.current = setTimeout(() => {
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setFormData({ name: "", carMake: "", message: "" });
      
      timeoutRef.current = setTimeout(() => setIsSuccess(false), 3000);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSuccess && (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm">
          <CheckCircle className="w-5 h-5" />
          Message prepared! WhatsApp should open shortly.
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground-muted mb-2">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          className={`input-field ${errors.name ? "border-red-500" : ""}`}
          placeholder="John Doe"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="carMake" className="block text-sm font-medium text-foreground-muted mb-2">
          Car Make and Model *
        </label>
        <input
          type="text"
          id="carMake"
          required
          value={formData.carMake}
          onChange={(e) => {
            setFormData({ ...formData, carMake: e.target.value });
            if (errors.carMake) setErrors({ ...errors, carMake: undefined });
          }}
          className={`input-field ${errors.carMake ? "border-red-500" : ""}`}
          placeholder="Toyota Hilux 2.4"
          aria-invalid={!!errors.carMake}
          aria-describedby={errors.carMake ? "carMake-error" : undefined}
        />
        {errors.carMake && (
          <p id="carMake-error" className="text-red-500 text-xs mt-1">{errors.carMake}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground-muted mb-2">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: undefined });
          }}
          className={`input-field resize-none ${errors.message ? "border-red-500" : ""}`}
          placeholder="Tell us about your car audio needs..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Preparing Message...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send via WhatsApp
          </>
        )}
      </button>
    </form>
  );
}
