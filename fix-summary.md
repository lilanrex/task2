Hi,

I spent some time working on the HackathonCard component and wanted to share what I found and fixed up.

What Needed Fixing:

Basically, there were a few awkward spots and potential issues:

Weird Display:

The  location pin icon showed up even if there was no location text next to it.

The participants count could say "undefined Participants" and didn't handle the difference between "1 Participant" and "5 Participants".
The description sometimes got added even when it wasn't actually shortened.
The "View More" / "Show Less" button for the description appeared all the time, even when the description was super short and didn't need expanding.
Button Problems:

The "View Details" button didn't actually do anything and wasn't properly set up as a button (which can mess with forms sometimes).
Accessibility:

The main hackathon image was missing a description for screen readers bad for accessibility.

The icons for location, date, etc., weren't labeled for screen readers.
The "View More" button didn't tell screen readers if the description was currently expanded or collapsed.
The "View Details" button could have been clearer for screen readers too.


Some really important details for the card (like name, image, dates, status) weren't marked as required, meaning we could accidentally try to show a card without them.
The card had a fixed width, so it wouldn't resize nicely on smaller screens or different devices.
The text color on the status badge (like "Upcoming") wasn't explicitly set, so it could be hard to read depending on the badge's background color.
The status text itself was shown exactly as it came in (e.g., "upcoming") instead of being nicely formatted ("Upcoming").
Using a <button> for "View Details" might not have been the best choice if it's just meant to link somewhere.
How I Fixed It:

I went through and addressed some of these points:

Made Core Info Required: I updated the code (props) so that things like the name, imageUrl, startDate, endDate, and status must be provided. 
Cleaned Up Display:
Now, the location icon and text only show up if a location is actually provided.
Same for dates – the date line only renders if we have both start and end dates.
Fixed the participants text to handle zero, one, or many participants correctly ("0 Participants", "1 Participant", "5 Participants") and only show if the number is provided.
Made sure the description only gets "..." if it's truly cut short, and the "View More" button only appears when needed. Also added the right signals (aria-expanded) for screen readers on that button.
Made Buttons Work:
Set the "View Details" button type correctly.
Hooked it up so it either runs a function we pass in (onViewDetails) or links to a URL (hackathonUrl). If neither is available, the button is now disabled so users aren't clicking on it.
Gave it a clearer label for screen readers (e.g., View Details for CoolHack 2025
Improved Accessibility:
Added descriptive alt text to the main image like "Banner image for CoolHack 2025.
Changed the date text color to a lighter gray that's much easier to read against the dark background.
Added labels (aria-label) to the small icons.
Refined Styling & Code:
Removed the fixed width (w-96) and made the card responsive (using max-w-sm w-full so it shrinks nicely but doesn't get too wide).
Set specific text colors (black or white) for the status badges to guarantee they're readable.
Made the status text look cleaner by capitalizing the first letter (e.g., "Upcoming").
Added a title attribute to the hackathon name so if it gets cut off, you can hover to see the full name.
Updated how the next/image is used to better fit modern Next.js practices for responsive images.
Potential Next Steps (Things to Consider):

I used page.jsx to test the HackathonCard.tsx in components after implementing the fixes

Things can be further improved by:

Handling dates more robustly (maybe using actual Date objects and a library for formatting, or showing relative time like "Starts in 2 days").
Add loading indicators (skeletons) for when the card data is being fetched.
wrap the card in an <article> tag for better structure.
Use next/link for the "View Details" if it links within our app.
Make the status badge its own reusable component.
Add tests to make sure the card always looks right with different info.
