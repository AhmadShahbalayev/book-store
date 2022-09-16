export const BookDetailsService = {
  getBookDetails: async (url: string | undefined) => {
    const urlQuery = `query={"url": "/${url}"}`;

    try {
      const data = await fetch(
        `https://cdn.contentstack.io/v3/content_types/book/entries?environment=${process.env.NODE_ENV}&${urlQuery}`,
        {
          headers: {
            api_key: process.env.REACT_APP_API_KEY!,
            access_token:
              process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_ACCESS_TOKEN_DEVELOPMENT!
                : process.env.REACT_APP_ACCESS_TOKEN_PRODUCTION!,
          },
        }
      ).then((res) => res.json());

      return data;
    } catch (error) {
      throw error;
    }
  },
};
