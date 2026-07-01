import { motion } from "framer-motion";
import { Star, Quote, Users, Leaf, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TestimonialCard = ({ testimonial, delay }: {
  testimonial: {
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
    location: string;
  };
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="glass rounded-3xl p-8 card-3d"
  >
    <div className="flex items-start gap-4 mb-6">
      <Avatar className="w-12 h-12 ring-2 ring-primary/20">
        <AvatarImage src={testimonial.image} />
        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
      </div>
      <Quote className="w-6 h-6 text-primary/30" />
    </div>

    <p className="text-muted-foreground leading-relaxed mb-6">
      "{testimonial.content}"
    </p>

    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < testimonial.rating
              ? "text-secondary fill-secondary"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {testimonial.rating}/5
      </span>
    </div>
  </motion.div>
);

const ImpactCard = ({ title, value, icon: Icon, description }: {
  title: string;
  value: string;
  icon: any;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="glass rounded-3xl p-8 card-3d text-center"
  >
    <div className="w-16 h-16 mx-auto glass rounded-2xl flex items-center justify-center mb-6 pulse-glow">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <div className="text-3xl font-bold gradient-text mb-2">{value}</div>
    <h4 className="font-semibold text-foreground mb-3">{title}</h4>
    <p className="text-sm text-muted-foreground">{description}</p>
  </motion.div>
);

export const TestimonialsImpact = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Herb Collector",
      content: "This platform has transformed how we track our herbs. Now consumers can see exactly where their Ashwagandha comes from - our family farm in Uttarakhand. It's increased our credibility and sales significantly.",
      rating: 5,
      image: "/avatars/farmer1.jpg",
      location: "Uttarakhand, India"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Quality Control Manager",
      content: "The blockchain verification gives us complete confidence in our supply chain. Every batch is tracked from collection to final product, making regulatory compliance effortless.",
      rating: 5,
      image: "/avatars/doctor1.jpg",
      location: "Mumbai, Maharashtra"
    },
    {
      name: "Anita Patel",
      role: "Consumer",
      content: "I love being able to scan the QR code and see my herbs' complete journey. Knowing the farmer who grew my Turmeric and seeing the lab certificates gives me peace of mind about authenticity.",
      rating: 5,
      image: "/avatars/consumer1.jpg",
      location: "Bangalore, Karnataka"
    }
  ];

  const impacts = [
    {
      title: "Farmers Empowered",
      value: "0",
      icon: Users,
      description: "Rural farmers connected to global markets with fair pricing"
    },
    {
      title: "Herbs Protected",
      value: "0",
      icon: Leaf,
      description: "Rare Ayurvedic species tracked and conservation efforts supported"
    },
    {
      title: "Quality Assured",
      value: "0%",
      icon: Award,
      description: "Products meet or exceed traditional Ayurvedic quality standards"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Community Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from farmers, processors, and consumers who trust our platform
          </p>
        </motion.div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ImpactCard {...impact} />
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Community Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-8 py-4">
            <Award className="w-6 h-6 text-primary" />
            <span className="font-semibold">Trusted by 10,000+ Community Members</span>
            <Badge variant="outline" className="glass border-primary/30 text-primary">
              Verified
            </Badge>
          </div>
        </motion.div>
      </div>
    </section>
  );
};