export default function Home() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullTitle = "90's 채팅";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullTitle.length) {
        setTitle(() => fullTitle.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return <div className=''></div>;
}
