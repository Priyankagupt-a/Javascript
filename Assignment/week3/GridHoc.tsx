import React, { useEffect, useState } from "react";

// Define types for the props
interface GridHocProps {
  url: string;
  dataProperties: string[];
}

// Define types for the state
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface PostData {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
//   address?: Address; // Optional address field
}

const GridHoc: React.FC<GridHocProps> = ({ url, dataProperties }) => {
  const [data, setData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: PostData[] = await response.json();
        setData(result);
        console.log(result)
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Clean up property names by trimming spaces and ensuring they match the keys of PostData
  const formatProperty = (property: string) => {
    return property.trim().toLowerCase();
  };

  // Dynamically create columns based on dataProperties
  return (
    <div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "20px 0",
          fontSize: "16px",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            {dataProperties.map((property, index) => (
              <th
                key={index}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f4f4f3",
                }}
              >
                {formatProperty(property)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user, rowIndex) => (
            <tr
              key={user.id}
              style={{
                backgroundColor: rowIndex % 2 === 0 ? "#f1f2f1" : "#fff",
              }}
            >
              {dataProperties.map((property, propIndex) => {
                // Format the property to match the key in PostData
                const formattedProperty = formatProperty(property);

                // Check if property exists in the user object
                if (formattedProperty in user) {
                  return (
                    <td
                      key={propIndex}
                      style={{
                        padding: "8px 12px",
                        border: "1px solid #ddd",
                      }}
                    >
                      {user[formattedProperty as keyof PostData]}
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={propIndex}
                      style={{
                        padding: "8px 12px",
                        border: "1px solid #ddd",
                      }}
                    >
                      N/A
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridHoc;