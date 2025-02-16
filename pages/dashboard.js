import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setWalletAddress(await signer.getAddress());
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setWalletAddress(accounts[0]);
            } else {
              setWalletAddress(null);
            }
          });
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      }
    };

    checkWallet();
  }, []);

  useEffect(() => {
    if (!walletAddress) return;

    const q = query(collection(db, "tasks"), where("owner", "==", walletAddress));
    const unsub = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, [walletAddress]);

  // Fetching Random Profile Picture
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1000); 
    fetch(`https://picsum.photos/id/${randomId}/info`)
      .then((res) => res.json())
      .then((data) => setProfilePic(data.download_url))
      .catch(() => setProfilePic("https://picsum.photos/60"));
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setWalletAddress(await signer.getAddress());
    } catch (error) {
      console.error("Failed to connect MetaMask:", error);
    }
  };

  const addTask = async () => {
    if (input.trim() && walletAddress) {
      await addDoc(collection(db, "tasks"), {
        text: input,
        date: new Date().toISOString(),
        status: "Pending",
        owner: walletAddress,
      });
      setInput("");
    }
  };

  return (
    <div className="dashboard-container max-w-lg mx-auto p-6 shadow-lg rounded-lg">
      {!walletAddress ? (
        <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      ) : (
        <>
          {/* 🔹 Profile Picture */}
          <img src={profilePic} alt="Profile" className="profile-pic mx-auto mb-4" />

          <h1 className="text-2xl font-bold text-center mb-4">
            Task Board ({walletAddress.slice(0, 6)}...)
          </h1>

          <div className="flex space-x-2 mb-4">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="task-input flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter task..."
            />
            <button onClick={addTask} className="add-task-button">
                ➕ Add Task
            </button>

          </div>

          <ul className="task-list">
            {tasks.map((task) => (
              <li 
                key={task.id} 
                className={`task-item flex justify-between items-center p-3 rounded-lg ${
                  task.status === "Completed" ? "completed" : "bg-gray-100"
                }`}
              >
                <span>
                  {task.text} 
                  <span className="text-xs text-gray-400"> ({new Date(task.date).toLocaleDateString()})</span>
                </span>

                <div className="flex gap-2">
                  {task.status !== "Completed" && (
                    <button 
                      onClick={() => updateDoc(doc(db, "tasks", task.id), { status: "Completed" })} 
                      className="complete-btn px-3 py-1 rounded"
                    >
                      ✅ Complete
                    </button>
                  )}
                  <button 
                    onClick={() => deleteDoc(doc(db, "tasks", task.id))} 
                    className="delete-btn px-3 py-1 rounded"
                  >
                    ❌ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
