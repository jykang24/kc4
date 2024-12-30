import Link from 'next/link';

export default function Hello() {
  return (
    <>
      <h1>Hello</h1>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore rem
        nisi nesciunt magnam cum. Blanditiis atque dolores recusandae porro aut
        laborum consectetur eaque eius, animi harum minima doloremque. Nostrum,
        expedita!
      </div>
      <Link href='/' scroll={false} type='button'>
        Dashboard
      </Link>
    </>
  );
}
