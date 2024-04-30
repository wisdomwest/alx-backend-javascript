import express from 'express';
import routes from './routes';

const app = express();
const PORT = 1245;

routes(app);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
module.exports = app;
