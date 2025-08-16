const News = ({ item }) => {
  return (
    <div style={{ border: "1px solid", marginBottom: 12 }}>
      <p>{item?.text || item?.title}</p>
      <a target="_blank" href={item?.url}>
        {item?.url}
      </a>
    </div>
  );
};

export default News;
