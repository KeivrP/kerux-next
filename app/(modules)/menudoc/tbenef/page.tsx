import React from 'react';

const TbenefPage = () => {
    const data = [
        { id: 1, name: 'Benefit 1', description: 'Description for benefit 1' },
        { id: 2, name: 'Benefit 2', description: 'Description for benefit 2' },
        { id: 3, name: 'Benefit 3', description: 'Description for benefit 3' },
    ];

    return (
        <div>
            <h1>Benefits Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TbenefPage;