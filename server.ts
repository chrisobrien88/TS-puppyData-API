import app from './app';
const port = 3000;

app.listen(port, (): void => {
  console.log(`Puppies app on ${port}`);
});
