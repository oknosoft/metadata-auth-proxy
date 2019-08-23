import React from 'react';

export default function Draggable({children, title, ...props}) {
  return <div className="dsn-component" onContextMenu={(e) => e.preventDefault()}>
    <div className="dsn-draggable-handle">{title}</div>
    <div className="dsn-content">{children}</div>
  </div>;
}
