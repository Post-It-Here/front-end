export const packagePost = (draft, recommendations) => {
    return {
      post: {
        title: draft.title,
        content: draft.content
      },
      recs: recommendations.map((rec, index) => {
        return { subreddit: rec, score: index + 1 };
      })
    };
  };
  
  export const packageEditedPost = (editedDraft, recommendations, postID) => {
    return {
      post: {
        title: editedDraft.title,
        content: editedDraft.content
      },
      recs: recommendations.map((rec, index) => {
        return { subreddit: rec, score: index + 1 };
      })
    };
  };
  
  const testPost = {
    post: {
      title: "I lost my job at the bank my very first day",
      content: "A woman asked me to check her balance so I pushed her over"
    },
    recs: [
      {
        subreddit: "IAmA",
        score: 1
      },
      {
        subreddit: "dadjokes",
        score: 2
      },
      {
        subreddit: "AskReddit",
        score: 3
      },
      {
        subreddit: "ShowerThoughts",
        score: 4
      }
    ]
  };