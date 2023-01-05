import app from './app';
const port = 8080;

app.listen(port, (): void => {
  console.log(`Puppies app on ${port}`);
});
