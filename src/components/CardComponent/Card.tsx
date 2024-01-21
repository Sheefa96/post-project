import React, { ReactNode } from "react";
import "./Card.css";
import image from "../../images/user.jpg";

interface CardProps {
  title: string;
  content: ReactNode;
  imageUrl?: string;
  userName?: string;
  postedDate?: string;
  about?: string;
  likes?: number;
  comments?: number;
}

const CardComponent: React.FC<CardProps> = ({
  title,
  content,
  imageUrl,
  userName,
  about,
  postedDate,
  likes,
  comments,
}) => {
  return (
    <div className="card">
      {imageUrl && (
        <div className="user-details">
          <div className="user-image">
            {/* <img src={imageUrl} alt="" className="card-image" /> */}
            <img src={image} alt="" className="card-image" />
          </div>
          <div className="user-info">
            {userName && <div className="user-name">{userName}</div>}
            {about && <div className="user-about">{about}</div>}
            {postedDate && <div className="posted-date">{postedDate}</div>}
            {/* {<div className="user-name">Dummy</div>}
            {<div className="user-about">Software Developer</div>}
            {<div className="posted-date">Posted on: 12/01/2024</div>} */}
          </div>
        </div>
      )}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <div className="card-body">{content}</div>
      </div>
      <div className="card-footer">
        <div className="like-comment-container">
          {likes !== undefined && (
            <span className="likes-icon-container">
              <i className="fas fa-thumbs-up"></i> {likes}
            </span>
          )}
          {comments !== undefined && (
            <button type="button" className="comment-icon-button">
              <i className="fas fa-comment"></i> {comments}
            </button>
          )}
        </div>
        <span className="view-post">
          View Post {"  "}
          <i className="fas fa-arrow-right"></i>
        </span>

        {/* <span className="likes">Likes: 3</span>
        <span className="comments">Comments: 58</span> */}
      </div>
    </div>
  );
};

export default CardComponent;
