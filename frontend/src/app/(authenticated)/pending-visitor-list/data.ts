import type { PendingVisitor } from "./columns";

// Note: In a real app, this data would come from the gate pass generation form.
// We've added the necessary fields here to simulate the approval flow.
export const data: PendingVisitor[] = [
    {
        id: "PEND-001",
        name: "Mark Twain",
        firstName: "Mark",
        lastName: "Twain",
        email: "mark.twain@example.com",
        phone: "(555) 123-4567",
        company: "Publishing House",
        address: "351 W 5th St",
        host: "Arthur Pendragon",
        purpose: "Book signing",
    },
    {
        id: "PEND-002",
        name: "Nikola Tesla",
        firstName: "Nikola",
        lastName: "Tesla",
        email: "nikola.tesla@example.com",
        phone: "(555) 987-6543",
        company: "AC/DC Electric",
        address: "1889 Wardenclyffe Ct",
        host: "Thomas Edison",
        purpose: "Discuss alternating current",
    },
]
