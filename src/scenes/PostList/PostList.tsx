import React, { Component, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import CardComponent from "../../components/CardComponent/Card";
import "./PostList.css";
import mockData from "../../mock/postCardMockData.json";
import ReactPaginate from "react-paginate";

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
}

interface PostListState {
  posts: Post[];
  searchTerm: string;
  selectedUser: string | null;
  currentPage: number;
  postsPerPage: number;
  loading: boolean;
}

class PostList extends Component<{}, PostListState> {
  state: PostListState = {
    posts: [],
    searchTerm: "",
    selectedUser: null,
    currentPage: 0,
    postsPerPage: 8,
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        posts: mockData.map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          imageUrl: post.imageUrl,
          userName: post.userName,
          postedDate: post.postedDate,
          about: post.about,
          likes: post.likes,
          comments: post.comments,
        })),
        loading: false,
      });
    }, 1000);
  }

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: event.target.value,
      currentPage: 0, // Reset currentPage to 0 when search changes
    });
  };

  handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: event.target.value || null,
      currentPage: 0, // Reset currentPage to 0 when user changes
    });
  };

  handlePageChange = (selectedPage: { selected: number }) => {
    this.setState({ currentPage: selectedPage.selected });
  };

  handleLogout = () => {
    window.location.href = "/";
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
  };

  render() {
    const {
      posts,
      searchTerm,
      selectedUser,
      currentPage,
      postsPerPage,
      loading,
    } = this.state;

    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedUser || post.userName === selectedUser)
    );

    const uniqueUsers = Array.from(new Set(posts.map((post) => post.userName)));
    const startIndex = currentPage * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return (
      <div className="post-list-container">
        <h2 className="post-list-header">Post List</h2>
        {loading && <div className="loading-text">Loading...</div>}
        {!loading && (
          <div className="filter-section">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={this.handleSearchChange}
            />
            <select value={selectedUser || ""} onChange={this.handleUserChange}>
              <option value="">All Users</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        )}
        {filteredPosts.length === 0 && !loading && (
          <div className="no-results-message">No results found!</div>
        )}
        <div className="card-list">
          {paginatedPosts.map((post: Post) => (
            <Link key={post.id} to={`/posts/${post.id}`} className="link-style">
              <CardComponent
                title={post.title}
                content={post.content}
                imageUrl={post.imageUrl}
                userName={post.userName}
                postedDate={post.postedDate}
                about={post.about}
                likes={post.likes}
                comments={post.comments}
              />
            </Link>
          ))}
        </div>
        {/* <div className="pagination-container"> */}
        {/* {filteredPosts.length > postsPerPage && ( */}
        {filteredPosts.length !== 0 && !loading && (
          <ReactPaginate
            pageCount={Math.ceil(filteredPosts.length / postsPerPage)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={this.handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )}
        {/* </div> */}
        {filteredPosts.length > postsPerPage && !loading && (
          <div className="logout-button-container">
            <button className="logout-button" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default PostList;
