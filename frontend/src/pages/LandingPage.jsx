import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, CheckCircle, Star, Shield, Award, MapPin, Clock, ChevronDown, ChevronUp, Users, Wrench, Calendar } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const PHONE_NUMBER = "+1 (817)-506-9696";
const PHONE_HREF = "tel:+18175069696";
const FORM_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/qTrXc3AYUYHnooyh3gIB/webhook-trigger/c26b38d9-061a-40fb-91ad-0990cfa7ca2b";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_apex-bath-pros/artifacts/m06telzz_logolp.png";

// GTM DataLayer helper
const pushToDataLayer = (event, data = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
};

// Project images from user
const projectImages = [
  { url: "https://customer-assets.emergentagent.com/job_apex-bath-pros/artifacts/faj5e6d5_ap1.webp", alt: "Luxury bathroom remodel with corner tub and glass shower" },
  { url: "https://customer-assets.emergentagent.com/job_apex-bath-pros/artifacts/a6taw48b_ap2.webp", alt: "Modern bathroom with double vanity" },
  { url: "https://customer-assets.emergentagent.com/job_apex-bath-pros/artifacts/bjsu0y72_ap3.jpg", alt: "Contemporary bathroom with dual mirrors" },
  { url: "https://customer-assets.emergentagent.com/job_apex-bath-pros/artifacts/kazms9fd_ap4.webp", alt: "Elegant bathroom with gold fixtures" },
  { url: "https://customer-assets.emergentagent.com/job_apex-bath-pros/artifacts/hp0gixk3_ap5.webp", alt: "Spa-like bathroom with freestanding tub" },
];

// Testimonials - Real Google Reviews
const testimonials = [
  { name: "Phillip Chapman", location: "Google Review", text: "Great price. FIVE BIG STARS for Stephen and the guys at Apex Bath and Remodeling. He responded quickly and took care of my bathroom problem. STRONGLY recommend.", rating: 5 },
  { name: "Clint Roberts", location: "Google Review", text: "Reasonable price. We haven't been in metroplex to long but the wonderful people i go to church with heard we needed to get our bathroom remodel and gave us a recommendation, apex wow no pressure, very informative. In fact I know more than the reps from the other companies that came out i think the other felt ickie like a used carsalesmen. Not apex it just felt right and I believe in divine intervention cause they finished our bathroom. We are safe and I know Steven and his team care. THANK YOU FOR MEETING MY EXPECTATIONS. DON'T WASTE YOUR TIME WITH THE OTHERS.", rating: 5 },
  { name: "kristi roberts", location: "Google Review", text: "We where so close to giving up on finding a solid company to trust our project with went to four big companies with showrooms thinking that's a great place to start, we had there designers out, wow either they knew nothing or where rude snobs. Sometimes that's how God works a friend told us about apex bath and remodeling form start to finish best experience we have ever had don't waste your time with anyone else love steve and his team phenomenal experts.", rating: 5 },
  { name: "Frank Dowler", location: "Google Review", text: "Never ever have we had to do a bathroom project before was a little bit nervous because my mom cannot get in and out of a bathtub anymore not safely anyhow so we went hunting for a good company to do this for us we don't have a lot of money so we can only afford to do it one time thank God we found Apex bathroom and remodeling a they were telling us stuff like blocking the walls where grab bars go for my mom and if it's not done that it's not really going to be safe there's nothing like having things shared with you that will protect your mom because we don't build Steve and his team are the most professional people we've ever met and the workmanship that they did was next level I feel good knowing that my mom is going to be safe because sometimes I have to be on the road and can't always be there thank you Apex for caring about me and my mom.", rating: 5 },
  { name: "Carlos Jones", location: "Google Review", text: "My new apex bathroom is absolutely stunning,they completed all the work in two days, the last time we remodeled they claimed to be effecent taking weeks vs 2days. We get back to our lives in only two day and it's beautiful exactly how we imagined it.thank you Steve we love you and your entire team.", rating: 5 },
  { name: "Irene Romero", location: "Google Review", text: "My parents needed a lot of help due to the fact that they are getting older. Apex where extremely patient with both of them, they are both hard of hearing. Any how they got what they needed to be safe. I am so relieved thank you apex.you have been a lifesaver.", rating: 5 },
  { name: "Danion Moseby", location: "Google Review", text: "We met apex when they where installing our neighbors home, they did beautiful work very professional clean, we hired them and so glad we did something the universe just takes care of you. Love Steve and Joe what a great team my mom will be next. Thank you guys.", rating: 5 },
  { name: "Robert", location: "Google Review", text: "Apex did a great job! They gave me a great offer, remodeled my master bathroom. From start to finish they delivered everything they promised. Highly recommend!", rating: 5 },
];

// FAQ items
const faqItems = [
  { question: "How long does a bathroom remodel take?", answer: "Most bathroom remodels in Dallas-Fort Worth take between 2-5 days depending on the scope. Simple shower remodels can be completed in as little as 2-3 days, while full bathroom renovations typically take 4-5 days. We work efficiently to minimize disruption to your home." },
  { question: "Do you offer financing options?", answer: "Yes! We offer flexible financing options to help make your dream bathroom affordable. During your free consultation, we'll discuss payment plans that fit your budget, including low monthly payment options." },
  { question: "What does a bathroom remodel cost in DFW?", answer: "Bathroom remodel costs in Dallas-Fort Worth vary based on the scope of work, materials selected, and size of the bathroom. We provide free, no-obligation estimates so you know exactly what to expect. Our current promotion includes $2,500 off for qualifying projects." },
  { question: "Do I need to leave my home during the remodel?", answer: "No, you don't need to leave your home. Our crews are clean, professional, and respectful of your space. We contain the work area and clean up daily. Most homeowners go about their normal routines during the remodel." },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    projectType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Load Wistia script
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://fast.wistia.com/player.js";
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/embed/1q05d4qp3c.js";
    script2.async = true;
    script2.type = "module";
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, projectType: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.address || !formData.projectType) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to webhook
      await fetch(FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          projectType: formData.projectType,
          source: "apex-bath-landing-page",
          formType: "lead_capture",
          timestamp: new Date().toISOString(),
        }),
      });

      // Push GTM dataLayer event
      pushToDataLayer("form_submit", {
        event_category: "Lead",
        event_label: "Lead Form Submission",
        form_name: "lead_capture",
        project_type: formData.projectType,
      });

      // Store form data in sessionStorage for booking page
      sessionStorage.setItem("leadData", JSON.stringify(formData));

      toast.success("Thank you! Redirecting to book your consultation...");
      
      // Navigate to booking page
      setTimeout(() => {
        navigate("/booking");
      }, 1000);
    } catch (error) {
      console.error("Webhook error:", error);
      // Still proceed even if webhook fails
      sessionStorage.setItem("leadData", JSON.stringify(formData));
      pushToDataLayer("form_submit", {
        event_category: "Lead",
        event_label: "Lead Form Submission",
        form_name: "lead_capture",
        project_type: formData.projectType,
      });
      toast.success("Thank you! Redirecting to book your consultation...");
      setTimeout(() => {
        navigate("/booking");
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallClick = () => {
    pushToDataLayer("click_call_button", {
      event_category: "Engagement",
      event_label: "Click to Call",
      phone_number: PHONE_NUMBER,
      page: "landing",
    });
    window.location.href = PHONE_HREF;
  };

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* White Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50" data-testid="navbar">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
          <img 
            src={LOGO_URL} 
            alt="Apex Bath & Remodeling Pros" 
            className="h-16 md:h-20 w-auto"
          />
          <button
            onClick={handleCallClick}
            data-testid="header-call-button"
            className="btn-cta flex items-center gap-2 text-sm md:text-base"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">{PHONE_NUMBER}</span>
            <span className="sm:hidden">Call Now</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative" data-testid="hero-section">
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Content */}
            <div className="text-white animate-fade-in-up">
              <div className="offer-badge mb-6">$2,500 OFF — Limited Time</div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Bathroom Remodeling in Dallas–Fort Worth Done Right — Without the Stress
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Full bathroom remodels, custom designs, and fast, professional installation by a trusted local team with 50+ years of combined experience.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Full Bathroom Remodels (Not Just Showers)",
                  "Custom Designs Tailored to Your Home",
                  "Fast Turnaround (Some Projects Completed in 2–3 Days)",
                  "Financing Options Available",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/95">
                    <CheckCircle className="w-5 h-5 text-[#FF6C00] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="trust-badge">
                  <Shield className="w-4 h-4" /> Licensed & Insured
                </div>
                <div className="trust-badge">
                  <MapPin className="w-4 h-4" /> Serving DFW Homeowners
                </div>
              </div>

              {/* Video Section */}
              <div className="mt-8 hidden lg:block">
                <p className="text-sm text-white/70 uppercase tracking-widest mb-3">Meet the Team Behind Apex Bath Remodeling Pros</p>
                <p className="text-white/80 mb-4">Real local experts proudly serving Dallas–Fort Worth homeowners.</p>
                <div className="video-container aspect-video">
                  <style dangerouslySetInnerHTML={{__html: `
                    wistia-player[media-id='1q05d4qp3c']:not(:defined) {
                      background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/1q05d4qp3c/swatch');
                      display: block;
                      filter: blur(5px);
                      padding-top: 56.25%;
                    }
                  `}} />
                  <wistia-player media-id="1q05d4qp3c" aspect="1.7777777777777777"></wistia-player>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div id="lead-form" className="form-card p-6 md:p-8 animate-fade-in-up animation-delay-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#003A75] mb-2">Get Your Free Estimate</h3>
                <p className="text-[#475569]">Takes 30 seconds • No obligation</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-[#0F172A] font-medium">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    data-testid="input-name"
                    className="mt-1 h-12 border-slate-200 focus:border-[#FF6C00]"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#0F172A] font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    data-testid="input-phone"
                    className="mt-1 h-12 border-slate-200 focus:border-[#FF6C00]"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#0F172A] font-medium">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    data-testid="input-email"
                    className="mt-1 h-12 border-slate-200 focus:border-[#FF6C00]"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-[#0F172A] font-medium">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="123 Main St, Dallas, TX"
                    value={formData.address}
                    onChange={handleInputChange}
                    data-testid="input-address"
                    className="mt-1 h-12 border-slate-200 focus:border-[#FF6C00]"
                  />
                </div>

                <div>
                  <Label className="text-[#0F172A] font-medium">Project Type</Label>
                  <Select onValueChange={handleSelectChange} value={formData.projectType}>
                    <SelectTrigger data-testid="select-project-type" className="mt-1 h-12 border-slate-200">
                      <SelectValue placeholder="Select your project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-remodel">Full Bathroom Remodel</SelectItem>
                      <SelectItem value="shower-remodel">Shower Remodel</SelectItem>
                      <SelectItem value="tub-to-shower">Tub to Shower Conversion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="submit-form-button"
                  className="w-full h-14 text-lg font-semibold bg-[#FF6C00] hover:bg-[#E65C00] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                </Button>
              </form>

              <p className="text-center text-sm text-[#94A3B8] mt-4">
                Serious inquiries only — limited availability each month.
              </p>
            </div>
          </div>

          {/* Mobile Video Section */}
          <div className="mt-12 lg:hidden">
            <p className="text-sm text-white/70 uppercase tracking-widest mb-3">Meet the Team</p>
            <p className="text-white/80 mb-4">Real local experts proudly serving Dallas–Fort Worth homeowners.</p>
            <div className="video-container aspect-video">
              <style dangerouslySetInnerHTML={{__html: `
                wistia-player[media-id='1q05d4qp3c']:not(:defined) {
                  background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/1q05d4qp3c/swatch');
                  display: block;
                  filter: blur(5px);
                  padding-top: 56.25%;
                }
              `}} />
              <wistia-player media-id="1q05d4qp3c" aspect="1.7777777777777777"></wistia-player>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="section-padding bg-[#EFF6FF]" data-testid="offer-section">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm uppercase tracking-widest text-[#FF6C00] font-semibold">Limited Time Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003A75] mt-4 mb-4">
            Get $2,500 Off Your Bathroom Remodel
          </h2>
          <p className="text-lg text-[#475569] mb-6">
            Available for homeowners who book a consultation before the end of spring.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#0F172A] mb-8">
            <Clock className="w-5 h-5 text-[#FF6C00]" />
            <span className="font-medium">Limited availability in Dallas–Fort Worth</span>
          </div>
          <Button
            onClick={scrollToForm}
            data-testid="check-availability-button"
            className="btn-cta text-lg px-8"
          >
            Check Availability
          </Button>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section-padding bg-white" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-[#FF6C00] font-semibold">Trusted by DFW Homeowners</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003A75] mt-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.slice(0, 4).map((testimonial, i) => (
              <div key={i} className="testimonial-card" data-testid={`testimonial-${i}`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-[#FF6C00] text-[#FF6C00]" />
                  ))}
                </div>
                <p className="text-[#475569] mb-4 leading-relaxed text-sm">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#003A75] flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">{testimonial.name}</p>
                    <p className="text-sm text-[#94A3B8]">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {testimonials.slice(4).map((testimonial, i) => (
              <div key={i + 4} className="testimonial-card" data-testid={`testimonial-${i + 4}`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-[#FF6C00] text-[#FF6C00]" />
                  ))}
                </div>
                <p className="text-[#475569] mb-4 leading-relaxed text-sm">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#003A75] flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">{testimonial.name}</p>
                    <p className="text-sm text-[#94A3B8]">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="section-padding bg-[#F8FAFC]" data-testid="showcase-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-[#FF6C00] font-semibold">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003A75] mt-4 mb-4">
              Recent Bathroom Remodeling Projects
            </h2>
            <p className="text-lg text-[#475569]">
              High-quality craftsmanship from real projects across Dallas–Fort Worth.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {projectImages.map((img, i) => (
              <div
                key={i}
                className={`project-image ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                data-testid={`project-image-${i}`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className={`w-full ${i === 0 ? "h-full min-h-[300px] md:min-h-[400px]" : "h-48 md:h-64"} object-cover`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <p className="text-center text-[#475569] mt-8">
            Every project is custom-designed to fit your home and needs.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white" data-testid="process-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-[#FF6C00] font-semibold">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003A75] mt-4">
              How Your Bathroom Remodel Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Request Your Free Estimate", description: "Fill out our quick form or call us. We'll schedule a convenient time to discuss your bathroom remodeling goals.", icon: Calendar },
              { step: 2, title: "Custom Design & Planning", description: "Our experts will help you design the perfect bathroom with materials and features that match your style and budget.", icon: Users },
              { step: 3, title: "Professional Installation", description: "Our skilled team completes your remodel quickly and professionally, leaving you with the bathroom of your dreams.", icon: Wrench },
            ].map((item, i) => (
              <div key={i} className="process-step" data-testid={`process-step-${i}`}>
                <span className="process-number">{item.step}</span>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-[#003A75]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#003A75] mb-3">{item.title}</h3>
                  <p className="text-[#475569] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-[#003A75]" data-testid="trust-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why Choose Apex Bath Remodeling Pros?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "50+ Years Combined Experience", text: "Our team brings decades of bathroom remodeling expertise to every project." },
              { icon: Shield, title: "Licensed & Insured", text: "Full coverage and proper licensing for your peace of mind." },
              { icon: Users, title: "Skilled Remodeling Specialists", text: "Factory-trained professionals dedicated to quality craftsmanship." },
              { icon: CheckCircle, title: "Clean, Respectful Crews", text: "We treat your home with care and clean up daily." },
              { icon: Shield, title: "Warranty-Backed Work", text: "Quality guaranteed with comprehensive warranty protection." },
              { icon: Users, title: "Safety & Accessibility Focus", text: "Specialized solutions for aging-in-place and mobility needs." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/10 backdrop-blur-sm" data-testid={`trust-item-${i}`}>
                <item.icon className="w-10 h-10 text-[#FF6C00] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white" data-testid="faq-section">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-[#FF6C00] font-semibold">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003A75] mt-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <div key={i} className="faq-item pb-4" data-testid={`faq-item-${i}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left py-4"
                  data-testid={`faq-button-${i}`}
                >
                  <span className="text-lg font-semibold text-[#0F172A] pr-4">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-[#FF6C00] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#94A3B8] flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="pb-4 text-[#475569] leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-[#EFF6FF]" data-testid="final-cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003A75] mb-4">
            Ready to Upgrade Your Bathroom?
          </h2>
          <p className="text-lg text-[#475569] mb-8">
            Book your consultation now and secure your $2,500 savings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToForm}
              data-testid="final-cta-schedule-button"
              className="btn-cta text-lg px-8"
            >
              Schedule My Free Consultation
            </Button>
            <Button
              onClick={handleCallClick}
              data-testid="final-cta-call-button"
              className="btn-blue text-lg px-8 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003A75] py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-white text-xl font-bold mb-2">Apex Bath Remodeling Pros</h3>
          <p className="text-white/70 mb-4">Bathroom Remodeling Dallas | Fort Worth | DFW Area</p>
          <a href={PHONE_HREF} className="text-[#FF6C00] font-semibold text-lg hover:underline">{PHONE_NUMBER}</a>
          <p className="text-white/50 text-sm mt-6">© {new Date().getFullYear()} Apex Bath Remodeling Pros. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky Mobile Bar */}
      <div className="sticky-mobile-bar md:hidden" data-testid="sticky-mobile-bar">
        <div className="flex gap-3">
          <Button
            onClick={handleCallClick}
            data-testid="mobile-call-button"
            className="flex-1 h-12 bg-[#003A75] hover:bg-[#002855] text-white font-semibold rounded-full flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </Button>
          <Button
            onClick={scrollToForm}
            data-testid="mobile-quote-button"
            className="flex-1 h-12 bg-[#FF6C00] hover:bg-[#E65C00] text-white font-semibold rounded-full"
          >
            Get Free Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
