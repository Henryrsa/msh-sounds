import ContactForm from "../components/ContactForm";
import { User, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12">
      <section className="section py-8 sm:py-12">
        <div className="container">
          <h1 className="section-title text-center">
            <span className="text-foreground">Contact </span>
            <span className="text-msh-red">Us</span>
          </h1>
          <p className="section-subtitle text-center mx-auto mb-10 sm:mb-16">
            Get in touch with us for a free quote on your car audio needs
          </p>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="card p-6 sm:p-8">
              <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-2">
                Send us a Message
              </h2>
              <p className="text-foreground-muted text-sm mb-6">
                Fill out the form below and we'll get back to you as soon as possible.
                Your message will be sent directly to our WhatsApp.
              </p>
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="card p-6 sm:p-8">
                <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-6">
                  Contact Information
                </h2>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-msh-red/10 flex items-center justify-center text-msh-red">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">Contact Person</p>
                      <p className="font-semibold">Sipho</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-msh-red/10 flex items-center justify-center text-msh-red">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">Phone</p>
                      <p className="font-semibold">071 639 1217</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-msh-red/10 flex items-center justify-center text-msh-red">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">Email</p>
                      <p className="font-semibold">Mohlalasipho67@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-msh-red/10 flex items-center justify-center text-msh-red">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">Address</p>
                      <p className="font-semibold">
                        33507 30 M-Motaung Street<br />
                        Mamelodi, Gauteng
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <h2 className="font-playfair text-2xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-msh-red" />
                  Business Hours
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-foreground-muted">Monday - Friday</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-foreground-muted">Saturday</span>
                    <span className="font-semibold">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-foreground-muted">Sunday</span>
                    <span className="font-semibold">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
