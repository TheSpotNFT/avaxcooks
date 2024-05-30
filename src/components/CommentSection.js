import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { COMMENTING_ABI, COMMENTING_ADDRESS } from './Contracts/CommentingContract';
import { VIBES_ABI, VIBES_ADDRESS } from './Contracts/VibesContract';
import { AVAXCOOKS_ABI, AVAXCOOKS_ADDRESS } from './Contracts/AvaxCooks';
import { db } from '../firebase3'; // Ensure you have firebase configured properly
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

const CommentComponent = ({ erc721TokenId, account }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [displayNames, setDisplayNames] = useState({});
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingNames, setLoadingNames] = useState(false);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  useEffect(() => {
    if (comments.length > 0) {
      fetchDisplayNames(comments);
    }
  }, [comments]);

  const fetchComments = async () => {
    if (!erc721TokenId) {
      console.error('erc721TokenId is undefined');
      return;
    }

    console.log('Fetching comments for erc721TokenId:', erc721TokenId);
    setLoadingComments(true);
    
    try {
      const q = query(collection(db, 'comments'), where('erc721TokenId', '==', erc721TokenId));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => doc.data());
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoadingComments(false);
  };

  const submitComment = async (isGood) => {
    if (!commentText) return;
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const avaxcooksContract = new ethers.Contract(AVAXCOOKS_ADDRESS, AVAXCOOKS_ABI, signer);
    const erc1155Contract = new ethers.Contract(VIBES_ADDRESS, VIBES_ABI, signer);
  
    // Determine token ID based on comment type
    const tokenId = isGood ? 1 : 2;
  
    // Fetch the NFT owner's address (assuming this information is available in your setup)
    const nftOwnerAddress = await avaxcooksContract.ownerOf(erc721TokenId);
    
  
    // Mint and send ERC-1155 token
    try {
     
      let options = {
        // price is 0.2 avax
        value: ethers.utils.parseEther("0.2"),
      };
      const tx = await erc1155Contract.mint(nftOwnerAddress, tokenId, 1, options);
      await tx.wait();
  
      // Add comment to Firestore (off-chain) only after minting is successful
      try {
        await addDoc(collection(db, 'comments'), {
          erc721TokenId,
          text: commentText,
          timestamp: Timestamp.now(),
          isGood,
          account
        });
  
        setCommentText('');
        fetchComments(); // Fetch comments after submitting a new comment
      } catch (error) {
        console.error('Error adding comment to Firestore: ', error);
      }
    } catch (error) {
      console.error('Error minting token: ', error);
    }
  };
  

  const fetchDisplayNames = async (comments) => {
    setLoadingNames(true);
    const newDisplayNames = {};
    for (const comment of comments) {
      const displayName = await getUserDisplayName(comment.account);
      newDisplayNames[comment.account] = displayName;
    }
    setDisplayNames(newDisplayNames);
    setLoadingNames(false);
  };

  const getUserDisplayName = async (address) => {
    try {
      const response = await fetch(`https://avalanche.skunkr.com/names/${address}`);
      const data = await response.json();
      const { names } = data;
      if (names.avvy) return names.avvy;
      if (names.fire) return names.fire;
      if (names.mambo) return names.mambo;
      if (names.moo) return names.moo;
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    } catch (error) {
      console.error('Error fetching username:', error);
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
  };

  return (
    <div className="bg-neutral-900 border-neutral-800 rounded-lg shadow-md w-full">
      <button
        onClick={() => setShowComments(!showComments)}
        className="bg-neutral-800 text-white rounded px-4 py-2 mb-4 hover:bg-avax-red transition duration-300 w-full"
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <>
          {(loadingComments || loadingNames) ? (
            <p className="text-white w-full">Loading comments...</p>
          ) : (
            <div className="comments w-full">
              {comments.map((comment, index) => (
                <div key={index} className="comment bg-neutral-800 text-white p-2 mb-2 rounded flex flex-col w-full">
                  <div className="text-left mb-1 w-full">
                    <p className='text-xs'>{displayNames[comment.account]} commented:</p>
                  </div>
                  <div className="text-left mb-2 w-full">
                    <p className='text-sm'>{comment.text}</p>
                  </div>
                  <div className="text-right text-xs mt-auto w-full">
                    <small>{new Date(comment.timestamp.seconds * 1000).toLocaleString()}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="comment-input mt-4 w-full">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-2 bg-neutral-800 text-white rounded mb-2 border border-neutral-700 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Write your comment here..."
            />
            <div className="flex space-x-2 w-full">
              <button
                onClick={() => submitComment(true)}
                className="bg-avax-red text-white rounded px-4 py-2 hover:bg-red-800 transition duration-300 w-full"
              >
                👍 Submit
              </button>
              <button
                onClick={() => submitComment(false)}
                className="bg-avax-red text-white rounded px-4 py-2 hover:bg-red-800 transition duration-300 w-full"
              >
                👎 Submit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
  
  
};

export default CommentComponent;
