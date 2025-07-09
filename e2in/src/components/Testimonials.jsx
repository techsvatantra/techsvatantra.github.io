import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Daughter of Client",
    image: "sarah-johnson",
    stars: 5,
    text: "The care provided to my mother has been exceptional. The caregivers are not only professional but also genuinely caring. They've become like family to us, and I can finally rest easy knowing my mother is in good hands."
  },
  {
    name: "Michael Thompson",
    role: "Son of Client",
    image: "michael-thompson",
    stars: 5,
    text: "After my father's stroke, we were worried about his recovery at home. The team at CarePlus created a comprehensive care plan that addressed all his needs. Their attention to detail and compassionate approach made all the difference."
  },
  {
    name: "Emily Rodriguez",
    role: "Client",
    image: "emily-rodriguez",
    stars: 5,
    text: "I was hesitant about having someone in my home, but my caregiver has been a blessing. She respects my independence while providing the support I need. I look forward to her visits and the companionship she provides."
  },
  {
    name: "David Wilson",
    role: "Grandson of Client",
    image: "david-wilson",
    stars: 5,
    text: "The peace of mind that comes with knowing my grandmother is receiving quality care is priceless. The caregivers are punctual, reliable, and truly care about her wellbeing. I highly recommend their services."
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium mb-2"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Hear from families who have experienced the difference our compassionate care makes in the lives of their loved ones.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="testimonial-card"
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-6 italic text-muted-foreground">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center bg-white rounded-xl p-8 shadow-lg max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6 text-left">
              <h3 className="text-2xl font-bold mb-2">Ready to experience our care?</h3>
              <p className="text-muted-foreground">Schedule a free consultation to discuss your needs.</p>
            </div>
            <div className="flex-shrink-0">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Book Consultation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;