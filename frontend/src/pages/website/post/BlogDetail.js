import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import {
  FaCalendarAlt,
  FaComment,
  FaShareAlt,
  FaBookmark,
  FaArrowLeft,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { detailPost } from '../../../services/website/post';
import '../../../assets/styles/BlogDetail.scss'; // Create this SCSS file

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPosts] = useState({});

  const loadData = async () => {
    const { data } = await detailPost(id);
    setPosts(data);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <div className="blog-detail-page mt-5 py-5">
      {/* Back Button */}
      <Button
        variant="light"
        className="back-button mt-3"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" />
        Quay lại
      </Button>

      {/* Hero Section */}
      <div className="blog-hero">
        <div className="hero-overlay"></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <Badge pill bg="primary" className="mb-3">
                Chuyên mục
              </Badge>
              <h1 className="blog-title">{post?.title}</h1>
              <div className="post-meta">
                <span className="me-3">
                  <FaCalendarAlt className="me-1" />
                  {formatDate(post?.date)}
                </span>
                <span>
                  <FaComment className="me-1" />
                  {post?.comments} Bình luận
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Content Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            {/* Featured Image */}
            <div className="featured-image mb-5">
              <img
                src={post?.image}
                alt={post?.title}
                className="img-fluid rounded"
              />
            </div>

            {/* Blog Content */}
            <div className="blog-content">
              <p className="lead">{post?.excerpt}</p>
              <div className="content-body">
                {post?.content?.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="tags-section mt-5">
              <h6 className="mb-3">Tags:</h6>
              <div>
                <Badge pill bg="light" text="dark" className="me-2">
                  Thể thao
                </Badge>
                <Badge pill bg="light" text="dark" className="me-2">
                  Sân bóng
                </Badge>
                <Badge pill bg="light" text="dark">
                  Giải trí
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons d-flex justify-content-between mt-5 pt-4 border-top">
              <Button variant="outline-primary">
                <FaShareAlt className="me-2" />
                Chia sẻ
              </Button>
              <Button variant="outline-secondary">
                <FaBookmark className="me-2" />
                Lưu bài viết
              </Button>
            </div>

            {/* Comments Section */}
            <div className="comments-section mt-5 pt-5">
              <h4 className="mb-4">
                <FaComment className="me-2" />
                {post.comments} Bình luận
              </h4>

              {/* Comment Form */}
              <div className="comment-form mb-5">
                <h5 className="mb-3">Để lại bình luận</h5>
                <form>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Viết bình luận của bạn..."
                    ></textarea>
                  </div>
                  <Button variant="primary">Gửi bình luận</Button>
                </form>
              </div>

              {/* Comment List */}
              <div className="comment-list">
                {/* Sample Comment */}
                <div className="comment-item mb-4 pb-4 border-bottom">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="comment-avatar bg-primary text-white rounded-circle">
                        TN
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">Trần Nguyễn</h6>
                        <small className="text-muted">2 ngày trước</small>
                      </div>
                      <p className="mb-0">Bài viết rất hay và hữu ích!</p>
                    </div>
                  </div>
                </div>

                {/* Another Sample Comment */}
                <div className="comment-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="comment-avatar bg-success text-white rounded-circle">
                        LM
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">Lê Minh</h6>
                        <small className="text-muted">1 tuần trước</small>
                      </div>
                      <p className="mb-0">
                        Cảm ơn tác giả đã chia sẻ thông tin này.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Related Posts */}
      <section className="related-posts py-5 bg-light">
        <Container>
          <h3 className="text-center mb-5">Bài viết liên quan</h3>
          <Row>
            {/* Sample Related Post 1 */}
            <Col md={4} className="mb-4">
              <div className="related-post-card">
                {/* <img 
                  src="https://via.placeholder.com/400x250?text=Related+Post" 
                  alt="Related post" 
                  className="img-fluid rounded"
                /> */}
                <h5 className="mt-3">Cách chọn sân bóng phù hợp</h5>
                <small className="text-muted">
                  <FaCalendarAlt className="me-1" />
                  15/05/2025
                </small>
              </div>
            </Col>

            {/* Sample Related Post 2 */}
            <Col md={4} className="mb-4">
              <div className="related-post-card">
                {/* <img 
                  src="https://via.placeholder.com/400x250?text=Related+Post" 
                  alt="Related post" 
                  className="img-fluid rounded"
                /> */}
                <h5 className="mt-3">Kinh nghiệm đặt sân giá rẻ</h5>
                <small className="text-muted">
                  <FaCalendarAlt className="me-1" />
                  10/05/2025
                </small>
              </div>
            </Col>

            {/* Sample Related Post 3 */}
            <Col md={4} className="mb-4">
              <div className="related-post-card">
                {/* <img 
                  src="https://via.placeholder.com/400x250?text=Related+Post" 
                  alt="Related post" 
                  className="img-fluid rounded"
                /> */}
                <h5 className="mt-3">Giải pháp cho sân ướt mùa mưa</h5>
                <small className="text-muted">
                  <FaCalendarAlt className="me-1" />
                  05/05/2025
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BlogDetail;
