import { useRouter } from "next/router";
import { ethers } from "ethers";
import { db } from "../firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export default function Home() {
  const router = useRouter();

  const handleLogin = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed! Please install it to continue.");
      return;
    }

    try {
      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      // Store wallet address in Firestore if it's a new user
      const userRef = doc(collection(db, "users"), walletAddress);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        await setDoc(userRef, { walletAddress, createdAt: new Date().toISOString() });
      }

      // Redirect to dashboard
      router.push(`/dashboard?wallet=${walletAddress}`);
    } catch (error) {
      console.error("MetaMask login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome to TaskBoard 🚀</h1>
        <p className="login-subtitle">Connect with MetaMask to continue</p>
        <button onClick={handleLogin} className="login-button">
          🔐 Connect Wallet
        </button>
      </div>
    </div>
  );
  
  
}
