// import React from 'react';
// import EntityList from './EntityList';

// export default function Home() {
// return (
//     <div>
//     <EntityList entityType="lists" />
//     <EntityList entityType="tasks" />
//     <EntityList entityType="steps" />
//     </div>
// );
// }

// function EntityList({ entityType }) {
// const [entities, setEntities] = React.useState([]);

// React.useEffect(() => {
//     fetch(`http://localhost:8000/api/${entityType}`)
//     .then(res => res.json())
//     .then(data => setEntities(data))
//     .catch(err => console.error(err));
// }, [entityType]);

// const handleDelete = (entityId) => {
//     fetch(`http://localhost:8000/api/${entityType}/${entityId}`, {
//     method: 'DELETE',
//     })
//     .then(() => {
//         setEntities(entities.filter(entity => entity._id !== entityId));
//     })
//     .catch(err => console.error(err));
// };

// return (
//     <div>
//     <h2>{entityType.toUpperCase()}</h2>
//     <ul>
//         {entities.map(entity => (
//         <li key={entity._id}>
//             <a href={`/${entityType}/${entity._id}`}>
//             {entity.title || entity.name}
//             </a>
//             <button onClick={() => handleDelete(entity._id)}>
//             Delete
//             </button>
//         </li>
//         ))}
//     </ul>
//     </div>
// );
// }
