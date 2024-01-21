import React, { Component } from "react";
import mockPostData from "../../mock/postCardMockData.json";
import "./PostDetails.css";
import image from "../../images/user.jpg";
import nature from "../../images/nature.jpg";

interface Comment {
  id: number;
  text: string;
  commentedUserName?: string;
  commentPostedDate?: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  userName?: string;
  postedDate?: string;
  about?: string;
  likes?: number;
  comments?: number;
  commentText?: Comment[];
}

interface PostDetailState {
  post: Post | null;
  loading: boolean;
  showComments: boolean;
  isLiked: boolean;
  likeCount: number;
  commentText: string;
  // addedComment: boolean;
}

class PostDetail extends Component<{}, PostDetailState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      post: null,
      loading: true,
      showComments: false,
      isLiked: false,
      likeCount: 0,
      commentText: "",
      // addedComment: false,
    };
  }

  componentDidMount() {
    this.fetchPostDetail();
  }

  fetchPostDetail = () => {
    try {
      const id: string = this.extractIdFromUrl();
      const data = mockPostData.find((post) => post.id.toString() === id);
      if (data) {
        this.setState({
          post: data,
          likeCount: data.likes || 0,
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
      this.setState({ loading: false });
    }
  };

  extractIdFromUrl = (): string => {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    return id;
  };

  handleLogout = () => {
    window.location.href = "/";
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
  };

  handlePostLike = () => {
    this.setState((prevState) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    }));
  };

  handlePostComment = () => {
    const currentDate = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const newCommentData: Comment = {
      id: Date.now(),
      text: this.state.commentText,
      commentedUserName: localStorage.getItem("username") || "",
      commentPostedDate: `${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getDate()}, ${currentDate.getFullYear()}`,
    };
    // this.setState((prevState) => ({
    //   addedComment: true,
    // }));
    this.setState((prevState) => ({
      post: {
        ...prevState.post!,
        comments: (prevState.post?.comments || 0) + 1,
        commentText: [...(prevState.post?.commentText || []), newCommentData],
      },
      commentText: "",
    }));
  };

  handleDeleteComment = (commentId: number) => {
    this.setState((prevState) => ({
      post: {
        ...prevState.post!,
        comments: (prevState.post?.comments || 0) - 1,
        commentText: prevState.post?.commentText?.filter(
          (comment) => comment.id !== commentId
        ),
      },
    }));
  };
  render() {
    const { loading, post, showComments, isLiked, likeCount, commentText } =
      this.state;

    return (
      <div className="post-detail-container">
        {loading && <div>Loading...</div>}
        {!loading && !post && <div>Error fetching post details.</div>}
        {post && (
          <div className="post-content-container">
            {/* Left Part */}
            <div className="left-part">
              <div className="detail-page-user-image-container">
                <img
                  src={image}
                  alt={post.userName}
                  className="detail-page-user-image"
                />
              </div>
              <div className="detail-page-user-name">{post.userName}</div>
              <div className="detail-page-user-about">{post.about}</div>
            </div>

            {/* Right Part */}
            <div className="right-part">
              <h1>{post.title}</h1>
              <div className="nature-image-container">
                <img src={nature} alt="" className="nature-image" />
              </div>
              <p>{post.content}</p>
              <div className="post-detail-page-icons-container">
                {post.likes !== undefined && (
                  <button
                    type="button"
                    className="post-detail-like-icon-button"
                    onClick={this.handlePostLike}
                  >
                    <i
                      className={`fas fa-thumbs-up ${isLiked ? "liked" : ""}`}
                    ></i>{" "}
                    {likeCount} Likes
                  </button>
                )}
                {post.comments !== undefined && (
                  <button
                    type="button"
                    className="post-detail-comment-icon-button"
                    onClick={() =>
                      this.setState({ showComments: !showComments })
                    }
                  >
                    <i className="fas fa-comment"></i> {post.comments} Comments
                  </button>
                )}
              </div>
              {/* Comments Section */}
              {showComments && post.commentText && (
                <div className="comment-section">
                  <h3 style={{ color: "#5a5959" }}>Comments</h3>
                  <div className="detail-page-comment-section">
                    {post.commentText.map((comment) => (
                      <div
                        className="detail-page-comment-details"
                        key={comment.id}
                      >
                        <div className="commented-user-image">
                          <img src={image} alt="" className="card-image" />
                        </div>
                        <div className="commented-user-info">
                          <div className="commented-user-name">
                            {comment.commentedUserName}
                          </div>
                          <div className="comment-posted-date">
                            {comment.commentPostedDate}
                          </div>
                          <div className="commented-text">{comment.text}</div>
                        </div>
                        {comment.commentedUserName ===
                          localStorage.getItem("username") && (
                          <div className="comment-delete-icon-container">
                            <i
                              className="fas fa-trash-alt delete-comment-icon"
                              onClick={() =>
                                this.handleDeleteComment(comment.id)
                              }
                            ></i>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="add-comment-container">
                    <textarea
                      placeholder="Add a comment..."
                      rows={2}
                      value={commentText}
                      onChange={(e) =>
                        this.setState({ commentText: e.target.value })
                      }
                      className="comment-textarea"
                    ></textarea>
                    <div className="post-comment-button-container">
                      <button
                        type="button"
                        className="post-comment-button"
                        onClick={this.handlePostComment}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="detail-page-logout-button-container">
                <button className="logout-button" onClick={this.handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PostDetail;
