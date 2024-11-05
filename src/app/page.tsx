export default function Home() {
  const announce = [
    "### 레드로 채팅에 오신걸 환영합니다. ###",
    "### 회원일 경우 /login을 통해 로그인합니다. ###",
    "### 회원이 아닐경우 /signin을 통해 회원가입합니다. ###",
  ];

  return (
    <div className=''>
      <ul>
        {announce.map((el, index) => (
          <li className='mb-2' key={index}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
