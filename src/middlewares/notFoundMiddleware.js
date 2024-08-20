// **WEBINAR-CODE**

// export const notFoundMiddleware = (req, res, next) => {
  //   res.status(404).json({
    //     message: 'Oops! Route was not found!',
    //   });
    // };


    // **SUMMARY-CODE**

export const notFoundMiddleware = (req, res) => {
  res.status(404).send('Oops! Route was not found!');
};
