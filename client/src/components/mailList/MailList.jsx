import "./mailList.scss";

const MailList = () => {
  return (
    <div className="mail">
      <div className="mails">
        <h1 className="mailTitle">Save time Save money</h1>
        <span className="mailDesc">
          Sign up and we'll send the best deals to you
        </span>
        <div className="mailInputContainer">
          <input type="text" placeholder="Your Email" />
          <button>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default MailList;
