// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { listPost } from "../../../services/website/post";

// function BlogList() {
//   const [posts, setPosts] = useState([]);

//   const loadData = async () => {
//     try {
//         const { data } = await listPost();
//         setPosts(data);
//     } catch (error) {
//         console.log('Lỗi không load được bài viết', error);
//     }
//   }
//   useEffect(() => {
//     loadData();
//   }, []);

//   return (
//     <Container className="mt-5 py-5">
//       {posts.length > 0 ? (
//         <Row>
//           {posts.map((post) => (
//             <Col md={12} key={post.id} className="mb-4">
//               <Card className="shadow-sm">
//                 <Row noGutters>
//                   <Col md={5}>
//                     <Card.Img
//                       variant="top"
//                       src={post.image}
//                       alt={post.title}
//                     />
//                   </Col>
//                   <Col md={7}>
//                     <Card.Body>
//                       <small className="text-muted">
//                         🗓 {post.date} | 💬 {post.comments} COMMENTS
//                       </small>
//                       <Card.Title>{post.title}</Card.Title>
//                       <Card.Text>{post.excerpt}</Card.Text>
//                       <Button
//                         variant="outline-primary"
//                         href={`/post/${post.id}`}
//                       >
//                         Read more →
//                       </Button>
//                     </Card.Body>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <p className="text-center text-muted">Không có bài viết nào.</p>
//       )}
//     </Container>
//   );
// }

// export default BlogList;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { listPost } from "../../../services/website/post";
import { format } from 'date-fns';
import { FaCalendarAlt, FaComment, FaArrowRight } from "react-icons/fa";
import "../../../assets/styles/BlogList.scss"; // Create this SCSS file

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const { data } = await listPost();
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return dateString; // Fallback if date parsing fails
    }
  };

  return (
    <section className="blog-section py-5 mt-5">
      <Container>
        <h2 className="section-title text-center mb-5">Bài viết blog mới nhất</h2>
        
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Tải bài viết...</p>
          </div>
        ) : posts.length > 0 ? (
          <Row className="g-4">
            {posts.map((post) => (
              <Col lg={6} key={post.id}>
                <Card className="blog-card h-100 shadow-sm">
                  <div className="card-img-container">
                    <Card.Img
                      variant="top"
                      src={post.image || 'https://via.placeholder.com/800x500?text=Blog+Image'}
                      alt={post.title}
                      className="blog-image"
                    />
                    <div className="card-overlay"></div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="post-meta mb-2">
                      <span className="me-3">
                        <FaCalendarAlt className="me-1" />
                        {formatDate(post.date)}
                      </span>
                      <span>
                        <FaComment className="me-1" />
                        {post.comments || 0} Comments
                      </span>
                    </div>
                    <Card.Title className="mb-3">{post.title}</Card.Title>
                    <Card.Text className="flex-grow-1">{post.excerpt}</Card.Text>
                    <Button
                      variant="outline-primary"
                      href={`/post/${post.id}`}
                      className="align-self-start mt-3"
                    >
                      Đọc thêm<FaArrowRight className="ms-2" />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <img 
              src="/images/no-posts.svg" 
              alt="No posts" 
              className="img-fluid mb-4"
              style={{ maxWidth: '300px' }}
            />
            <h4 className="text-muted">Không có bài viết nào có sẵn</h4>
            <p className="text-muted">Kiểm tra lại sau để biết nội dung mới</p>
          </div>
        )}
      </Container>
    </section>
  );
}

export default BlogList;