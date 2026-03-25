"use client";

import { Showcase, Preview } from "../_showcase";
import { Comment } from "@/components/molecules/Comment";

export default function CommentPage() {
  return (
    <Showcase title="Comment" description="Comment/thread item with author, time, reply, and nested replies.">

      <Preview label="Single comment">
        <Comment
          author="Sarah Miller"
          authorRole="Security Manager"
          content="Access log reviewed. The badge failure at Gate 3 was caused by a firmware mismatch on the reader. Escalating to IT for a scheduled update."
          time="2h ago"
          onReply={() => {}}
          onMore={() => {}}
        />
      </Preview>

      <Preview label="Thread with replies">
        <div className="flex flex-col gap-4">
          <Comment
            author="Tom Baker"
            authorRole="Facility Manager"
            content="Weekly capacity report is attached. Occupancy peaked at 87% on Thursday. We should review the floor 3 booking policy."
            time="Yesterday"
            onReply={() => {}}
            replies={[
              {
                author: "Sarah Miller",
                content: "Agreed. I'll set up a review session for next week. Can you share the raw data?",
                time: "Yesterday",
                onReply: () => {},
                replies: [
                  {
                    author: "Tom Baker",
                    content: "Sent to your email. Let me know if you need anything else.",
                    time: "23h ago",
                  },
                ],
              },
            ]}
          />
        </div>
      </Preview>

    </Showcase>
  );
}
