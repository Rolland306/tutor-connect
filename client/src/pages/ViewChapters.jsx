import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewChapters = (props) => {
  const API_URL = "http://localhost:3001";
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [comment, setComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [masteredChapters, setMasteredChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await fetch(`${API_URL}/api/chapters`);
      const data = await response.json();
      setChapters(data);
    };

    fetchChapters();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      if (selectedChapter) {
        const response = await fetch(
          `${API_URL}/api/comments?chapter_id=${selectedChapter.chapter_id}`
        );
        const data = await response.json();
        setComments(data);
      }
    };

    fetchComments();
  }, [selectedChapter]);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setShowCommentForm(false); // Reset comment form visibility
  };

  const handleCommentClick = () => {
    setShowCommentForm(true);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Add logic to submit the comment
    const response = await fetch(`${API_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: comment,
        user_id: 1, // Replace with the actual user ID
        chapter_id: selectedChapter.chapter_id,
      }),
    });

    if (response.ok) {
      // Refresh comments after submission
      setComment(""); // Clear the comment input
      setShowCommentForm(false); // Hide comment form after submission
      const updatedComments = await response.json();
      setComments(updatedComments);
    }
  };

  const handleMasteredChapter = () => {
    if (selectedChapter) {
      setMasteredChapters((prevChapters) => [
        ...prevChapters,
        selectedChapter.chapter_id,
      ]);
    }
  };

  return (
    <div className="chaptersContainer">
      <ul className="chapterList">
        {chapters.map((chapter) => (
          <li
            key={chapter.chapter_id}
            onClick={() => handleChapterClick(chapter)}
          >
            <Link>{chapter.chapter_name}</Link>
          </li>
        ))}
      </ul>

      <div className="chapterContent">
        <h2>{selectedChapter?.chapter_name}</h2>
        <p>{selectedChapter?.content}</p>

        {/* Display comments */}
        {comments.length > 0 ? (
          <div>
            <h3>Comments:</h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.comment_id}>{comment.text}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}

        {/* Display comment textarea and submit button if showCommentForm is true */}
        {showCommentForm && (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type your comment here..."
            />
            <button type="submit">Submit Comment</button>
          </form>
        )}

        {/* Display comment button if showCommentForm is false */}
        {!showCommentForm && (
          <button onClick={handleCommentClick}>Comment 📝</button>
        )}

        {/* Additional buttons */}
        <br />
        <br />
        <br />
        <br />

        <br />
        <Link to={"/selectclasses"}>
          <button>Mastered Chapter ✅</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewChapters;
