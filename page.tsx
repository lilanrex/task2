// Example: pages/index.tsx (or app/page.tsx)

import { HackathonCard } from '../components/HackathonCard'; 


const sampleHackathon1 = {
  name: "Future Devs Challenge: AI for Good",
  imageUrl: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", // Replace with a real image URL or path
  location: "Online",
  participants: 150,
  startDate: "2025-06-15",
  endDate: "2025-06-17",
  description: "Join us for a 48-hour coding marathon focused on leveraging artificial intelligence to solve real-world problems. This is a very long description designed specifically to test the truncation feature of the card component, ensuring that the 'View More' button appears correctly and that clicking it reveals the full text content as expected. We need more than one hundred characters for this.",
  status: "upcoming" as const, 
  hackathonUrl: "https://example.com/hackathon1",
  onViewDetails: (name: string) => alert(`View Details clicked for: ${name}`),
};

const sampleHackathon2 = {
    name: "EcoHack 2025",
    imageUrl: "/placeholder.png", 
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    status: "ended" as const,
    participants: 42,
    
};

const sampleHackathon3 = {
    name: "Live Coding Session",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    startDate: "2025-05-03",
    endDate: "2025-05-05",
    status: "live" as const,
    location: "Lagos, Nigeria",
    participants: 1, 
    description: "Short description.",
    
    onViewDetails: (name: string) => console.log(`Viewing details for ${name}`),
};


export default function HomePage() {
  return (
    <div className="bg-gray-900 min-h-screen p-10 flex flex-wrap gap-8 justify-center items-start">
       
       <HackathonCard {...sampleHackathon1} />

       <HackathonCard {...sampleHackathon2} />

       
       <HackathonCard {...sampleHackathon3} />

        <HackathonCard
            name="Missing Optionals Test"
            imageUrl="https://images.unsplash.com/photo-1610563166170-4758c8c6b7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            startDate="2025-07-01"
            endDate="2025-07-03"
            status="upcoming"
            
        />
         <HackathonCard
            name="No Action Button Test"
            imageUrl="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            startDate="2025-04-01"
            endDate="2025-04-03"
            status="ended"
            location="Virtual"
            description="This card has no URL or details handler, the button should be disabled."
          
        />

    </div>
  );
}