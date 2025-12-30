const Postone = ({ posts }) => {
  return (
    <>
    <h1>{posts.id}</h1>
      <h1>{posts.title}</h1>
      <p>{posts.body}</p>
    </>
  );
};

export default Postone;
