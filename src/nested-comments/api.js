const data = [
  {
    id: 1,
    author: "Alice",
    comment: "This is the first comment.",
    timestamp: "2024-06-21T08:30:00Z",
    replies: [
      {
        id: 2,
        author: "Bob",
        comment: "This is a reply to the first comment.",
        timestamp: "2024-06-21T09:00:00Z",
        replies: [
          {
            id: 3,
            author: "Charlie",
            comment: "This is a nested reply.",
            timestamp: "2024-06-21T09:30:00Z",
            replies: [
              {
                id: 4,
                author: "Diana",
                comment: "This is a deeply nested reply.",
                timestamp: "2024-06-21T10:00:00Z",
                replies: [
                  {
                    id: 5,
                    author: "Eve",
                    comment: "This is the deepest level reply.",
                    timestamp: "2024-06-21T10:30:00Z",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    author: "Frank",
    comment: "This is another top-level comment.",
    timestamp: "2024-06-21T11:00:00Z",
    replies: [
      {
        id: 7,
        author: "Grace",
        comment: "Reply to Frank's comment.",
        timestamp: "2024-06-21T11:30:00Z",
        replies: [
          {
            id: 8,
            author: "Hank",
            comment: "Nested reply to Grace's comment.",
            timestamp: "2024-06-21T12:00:00Z",
            replies: [],
          },
        ],
      },
    ],
  },
];

export const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        new Response(JSON.stringify(data), {
          headers: {
            "content-type": "application/json",
          },
        })
      );
    }, 300);
  });
};
