const themes = {
    minimalist: {
        body: "font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; padding: 50px; background: #fff;",
        h1: "font-size: 32px; color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px;",
        p: "margin-bottom: 15px; font-size: 14px;",
        container: "max-width: 800px; margin: auto;"
    },
    professional: {
        body: "font-family: 'Georgia', serif; line-height: 1.8; color: #2c3e50; padding: 60px; background: #fdfdfd;",
        h1: "font-size: 36px; color: #1a252f; text-align: center; text-transform: uppercase; letter-spacing: 2px;",
        p: "margin-bottom: 20px; font-size: 16px; text-align: justify;",
        container: "max-width: 700px; margin: auto; border: 1px solid #ddd; padding: 40px; background: white;"
    }
};

module.exports = themes;
