---
title: Hello
---
<div>
  <h1>Compositor JSX</h1>
  <ul>
    <li>
      <Link to={`/?title=${props.title}`}>Home</Link>
    </li>
    <li>
      <Link to='/scoped'>Scoped with front matter import</Link>
    </li>
    <li>
      <Link to='/options-scope'>Scoped with loader options</Link>
    </li>
  </ul>
</div>
