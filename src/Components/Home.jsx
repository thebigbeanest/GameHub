import React from 'react';

const Home = ({ reviews = [] }) => { // Provide a default empty array
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Welcome to GameHub</h1>
                <p style={styles.subtitle}>Where Fun Meets Learning</p>
            </header>
            <main style={styles.mainContent}>
                <section style={styles.introSection}>
                    <h2 style={styles.sectionTitle}>Discover Amazing Games</h2>
                    <p style={styles.paragraph}>
                        At GameHub, we bring you an exciting collection of games designed to entertain and educate. Our platform features a wide variety of games that cater to all tastes and skill levels. Whether you're into action, strategy, or puzzle games, you'll find something you love here.
                    </p>
                    <p style={styles.paragraph}>
                        Our games are not just about fun; they are crafted to provide valuable lessons in CSS, HTML, and JavaScript. Each game incorporates practical coding concepts and challenges that help you learn and improve your web development skills in a playful and interactive way.
                    </p>
                </section>
                <section style={styles.useSection}>
                    <h2 style={styles.sectionTitle}>Learn While You Play</h2>
                    <p style={styles.paragraph}>
                        GameHub is more than just a gaming platform. It's a unique educational tool designed to teach you the fundamentals of web development. By engaging with our games, you'll learn how to:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Create visually appealing web pages using CSS.</li>
                        <li style={styles.listItem}>Structure content effectively with HTML.</li>
                        <li style={styles.listItem}>Add interactive features and functionality with JavaScript.</li>
                    </ul>
                    <p style={styles.paragraph}>
                        Each game is crafted with various web elements such as <strong>divs</strong>, <strong>boxes</strong>, and <strong>layouts</strong> to provide a hands-on experience. You'll tackle real-world coding problems and gain practical knowledge that you can apply in your own projects.
                    </p>
                </section>
                <section style={styles.reviewsSection}>
                    <h2 style={styles.sectionTitle}>What Our Users Are Saying</h2>
                    {reviews.length > 0 ? (
                        <ul style={styles.list}>
                            {reviews.map((review, index) => (
                                <li key={index} style={styles.reviewItem}>
                                    <strong>{review.user}:</strong> {review.text}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={styles.paragraph}>No reviews yet. Be the first to share your experience!</p>
                    )}
                </section>
            </main>
            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2024 GameHub. All rights reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: 'var(--text-color-light)',
        backgroundColor: 'var(--background-color)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        backgroundColor: 'var(--nav-bg-color)',
        padding: '20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '3em',
        margin: '0',
        color: 'var(--text-color-light)',
    },
    subtitle: {
        fontSize: '1.5em',
        margin: '10px 0 0',
        color: 'var(--nav-link-hover-color)',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
    },
    introSection: {
        marginBottom: '30px',
    },
    useSection: {
        marginBottom: '30px',
    },
    reviewsSection: {
        marginBottom: '30px',
    },
    sectionTitle: {
        fontSize: '2em',
        marginBottom: '10px',
        color: 'var(--text-color-light)',
    },
    paragraph: {
        fontSize: '1.1em',
        lineHeight: '1.6',
    },
    list: {
        paddingLeft: '20px',
    },
    listItem: {
        fontSize: '1.1em',
        lineHeight: '1.6',
    },
    reviewItem: {
        marginBottom: '10px',
        fontSize: '1.1em',
        color: 'var(--text-color-light)',
    },
    footer: {
        backgroundColor: 'var(--nav-bg-color)',
        padding: '10px',
        textAlign: 'center',
    },
    footerText: {
        fontSize: '0.9em',
        color: 'var(--nav-link-hover-color)',
    },
};

export default Home;

