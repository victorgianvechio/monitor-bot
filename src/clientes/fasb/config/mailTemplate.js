export default obj => {
  return {
    title: `${obj.title}`,
    message: `${obj.message}
                <br />
                <br />
                <b>${obj.log}</b>
                <br />
                <br />
                <b>Monitor Bot</b>`,
  };
};
