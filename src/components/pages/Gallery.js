// Gallery.js
import React, { useState, useEffect } from "react";
import NFTCard from "./NFTCard";
import Modal from "./Modal"
import { ethers, Contract } from "ethers";
import { AVAXCOOKSLIKESANDTIPS_ABI, AVAXCOOKSLIKESANDTIPS_ADDRESS } from '../Contracts/AvaxCooksLikeAndTip';
import TipDisplay from "../TipDisplay";


const Gallery = ({ account }) => {
  const [allTokens, setAllTokens] = useState([]);
  const [displayTokens, setDisplayTokens] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [mealType, setMealType] = useState('all');
  const [sortLikes, setSortLikes] = useState(false);
  const [likes, setLikes] = useState(0);
  const [community, setCommunity] = useState('All Communities');
  const [searchText, setSearchText] = useState('');
  const [sortTips, setSortTips] = useState(false);
  const [tipsData, setTipsData] = useState({});

  const toggleSortTips = () => {
    setSortTips(!sortTips); // Toggle sortTips state
  };

  const handleTipsFetch = (tokenId, tips) => {
    setTipsData(prev => ({ ...prev, [tokenId]: tips }));
  };

  //const provider = new ethers.providers.Web3Provider(ethereum);
  //const contract = new ethers.Contract(AVAXCOOKSLIKESANDTIPS_ADDRESS, AVAXCOOKSLIKESANDTIPS_ABI, provider);


  const fetchItems = async () => {
    if (loading) return;
    setLoading(true);

    const pageTokenParam = pageToken ? `&pageToken=${pageToken}` : "";
    const url = `https://glacier-api.avax.network/v1/chains/43114/nfts/collections/0x568863597b44AA509a45C15eE3Cab3150a562d32/tokens?pageSize=100`;
    const options = { method: "GET", headers: { accept: "application/json" } };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
        console.log(data);
      if (response.ok && Array.isArray(data.tokens)) {
        
        setTokens((prevTokens) => [...prevTokens, ...data.tokens]);
        setPageToken(data.nextPageToken); // Update pageToken if it exists
        setAllTokens(data.tokens);
        setDisplayTokens(data.tokens); 
      } else {
        throw new Error(data.message || "Error fetching data");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(); // Initial fetch
  }, []);

  const toggleSortLikes = () => {
    setSortLikes(!sortLikes);
  };

  // Function to fetch likes count and check if the current user has liked this token
  const fetchLikesAndCheckLiked = async (tokenId) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new Contract(
          AVAXCOOKSLIKESANDTIPS_ADDRESS,
          AVAXCOOKSLIKESANDTIPS_ABI,
          signer
        );
        
        // Fetch likes count
        const count = await contract.likes(tokenId);
        setLikes(parseInt(count.toString(), 10));

      }
    } catch (error) {
      console.error("Error fetching likes count or checking liked status:", error);
    }
  };
  useEffect(() => {
    fetchLikesAndCheckLiked();
  }, [account]);

  useEffect(() => {
    filterAndSortTokens();
  }, [mealType, allTokens, sortLikes, community, searchText]); // Re-filter and sort when these dependencies change

  const filterAndSortTokens = () => {
    let filteredTokens = allTokens;
  
    // Filter by meal type if not 'all'
    if (mealType !== 'all') {
      filteredTokens = filteredTokens.filter(token => {
        const attributes = JSON.parse(token.metadata.attributes);
        return attributes.some(attr => attr.trait_type === "Category" && attr.value === mealType);
      });
    }
  
    // Filter by community if not 'All Communities'
    if (community !== 'All Communities') {
      filteredTokens = filteredTokens.filter(token => {
        const attributes = JSON.parse(token.metadata.attributes);
        return attributes.some(attr => attr.trait_type === "Community Tag" && attr.value === community);
      });
    }

      // Filter by search text
  if (searchText.trim() !== '') {
    const lowerCaseSearchText = searchText.toLowerCase();
    filteredTokens = filteredTokens.filter(token => {
      const attributes = JSON.parse(token.metadata.attributes);
      return attributes.some(attr => 
        attr.value.toLowerCase().includes(lowerCaseSearchText)
      );
    });
  }
  
    // Sort by likes if enabled
    if (sortLikes) {
      filteredTokens = filteredTokens.slice().sort((a, b) => b.likes - a.likes);
    }
    if (sortTips) {
      filteredTokens = filteredTokens.slice().sort((a, b) => {
        const tipsA = Object.values(tipsData[a.tokenId] || {}).reduce((acc, val) => acc + parseFloat(val), 0);
        const tipsB = Object.values(tipsData[b.tokenId] || {}).reduce((acc, val) => acc + parseFloat(val), 0);
        return tipsB - tipsA;
      });
    }
  
    setDisplayTokens(filteredTokens);
  };

  const toggleBookmarks = () => {
    setShowBookmarks(!showBookmarks);  // Toggle bookmark view
  };

  /*if (!account) {
    return <div>Loading account information...</div>; // Show a loading message if account is not yet available
  }*/

  return (
    <div className="container mx-auto p-4 pt-8 md:pt-4">
      <h1 className="text-2xl font-bold mb-4 text-avax-white">The Cook Book</h1>
      <div className="py-8 pb-24 md:py-0 mx-auto"><div className="mx-auto w-72 h-72 pointer-events-none block md:hidden pb-8">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 419.18 474.09">
                    <defs>
                        <style>
                            {`.cls-1 { fill: #e84142; fill-rule: evenodd; }
                            .cls-1, .cls-2, .cls-3, .cls-4 { stroke-width: 0px; }
                            .cls-2, .cls-4 { fill: #000; }
                            .cls-5, .cls-4 { opacity: .39; }
                            .cls-6 { fill: none; stroke-linecap: round; }
                            .cls-6, .cls-7 { stroke: #000; stroke-miterlimit: 10; stroke-width: 18px; }
                            .cls-3 { fill: #f3f2f2; }
                            .cls-7 { fill: #fff; }`}
                        </style>
                    </defs>
                    <circle className="cls-7" cx="214.84" cy="345.61" r="97.32"/>
                    <g>
    <path class="cls-1" d="M334.71,345.61c0,66.2-53.67,119.87-119.87,119.87s-119.87-53.67-119.87-119.87,53.67-119.87,119.87-119.87,119.87,53.67,119.87,119.87ZM180.87,393.32h-23.26c-4.89,0-7.3,0-8.77-.94-1.59-1.03-2.56-2.74-2.68-4.62-.09-1.74,1.12-3.86,3.53-8.1l57.44-101.24c2.44-4.3,3.68-6.45,5.24-7.24,1.68-.85,3.68-.85,5.36,0,1.56.8,2.8,2.94,5.24,7.24l11.81,20.61.06.11c2.64,4.61,3.98,6.95,4.56,9.41.65,2.68.65,5.51,0,8.19-.59,2.47-1.91,4.83-4.59,9.51l-30.17,53.33-.08.14c-2.66,4.65-4,7.01-5.87,8.79-2.03,1.94-4.48,3.36-7.16,4.15-2.44.68-5.18.68-10.66.68ZM239.62,393.32h33.33c4.92,0,7.39,0,8.86-.97,1.59-1.03,2.59-2.77,2.68-4.65.08-1.68-1.1-3.72-3.41-7.71-.08-.14-.16-.27-.24-.42l-16.7-28.56-.19-.32c-2.35-3.97-3.53-5.97-5.05-6.75-1.68-.85-3.65-.85-5.33,0-1.53.8-2.77,2.89-5.21,7.1l-16.64,28.56-.06.1c-2.44,4.2-3.65,6.31-3.56,8.03.12,1.88,1.09,3.62,2.68,4.65,1.44.94,3.92.94,8.83.94Z"/>
    <path class="cls-2" d="M214.84,474.09c-70.84,0-128.48-57.64-128.48-128.48s57.64-128.48,128.48-128.48,128.48,57.64,128.48,128.48-57.64,128.48-128.48,128.48ZM214.84,234.36c-61.35,0-111.25,49.91-111.25,111.25s49.91,111.25,111.25,111.25,111.25-49.91,111.25-111.25-49.91-111.25-111.25-111.25ZM272.95,401.93h-33.33c-6.21,0-9.95,0-13.54-2.34-3.82-2.48-6.28-6.72-6.57-11.33v-.11c-.22-4.27,1.63-7.47,4.71-12.78l.06-.11,16.64-28.57c2.95-5.08,4.9-8.44,8.68-10.4,4.18-2.13,9.09-2.13,13.21-.03,3.75,1.91,5.66,5.14,8.55,10.04l.19.32,16.97,29.03c2.88,4.98,4.78,8.25,4.57,12.48-.22,4.62-2.68,8.91-6.6,11.44-3.58,2.36-7.33,2.36-13.55,2.36ZM276.05,388.72h0s0,0,0,0ZM238.72,384.7h35.14c-.08-.13-.16-.27-.23-.4l-.25-.44-16.84-28.8c-.09-.16-.19-.32-.28-.48-.15.26-.3.52-.45.77l-16.7,28.66c-.13.22-.26.45-.4.68ZM234.17,384.56h0ZM278.37,384.56h0ZM180.87,401.93h-23.26c-6.12,0-9.82,0-13.41-2.3-3.89-2.52-6.35-6.75-6.64-11.34v-.1c-.22-4.25,1.61-7.47,4.65-12.8l57.43-101.23c2.98-5.23,4.94-8.69,8.82-10.67,4.13-2.1,9.06-2.1,13.18,0,3.89,1.98,5.85,5.44,8.82,10.66l11.86,20.7c2.86,5,4.59,8.02,5.46,11.68.96,3.97.96,8.2,0,12.2-.89,3.72-2.62,6.75-5.49,11.77l-30.25,53.47c-2.89,5.05-4.63,8.1-7.41,10.75-2.98,2.85-6.67,4.99-10.64,6.17l-.16.04c-3.57.99-6.91.99-12.96.99ZM156.73,384.7h24.15c4.32,0,6.95,0,8.29-.35,1.35-.42,2.55-1.12,3.57-2.09.97-.92,2.24-3.15,4.35-6.83l.08-.14,30.15-53.3c2.24-3.91,3.41-5.99,3.71-7.27.33-1.38.33-2.81,0-4.17-.3-1.28-1.57-3.49-3.67-7.15l-11.87-20.72c-.14-.26-.3-.52-.45-.79-.15.26-.29.51-.43.76l-57.43,101.24c-.15.26-.3.53-.45.8Z"/>
  </g>
  <path class="cls-2" d="M112.36,273.44c-3.97,0-7.85-1.3-11.11-3.79-4.58-3.5-7.21-8.82-7.21-14.58,0-6.91,3.81-13.16,9.95-16.32l8.6-4.43c.38-.2.61-.58.61-1.01v-39.75c0-4.76,3.86-8.61,8.61-8.61s8.61,3.86,8.61,8.61v39.75c0,6.9-3.81,13.16-9.95,16.32l-8.61,4.44c-.38.2-.61.58-.61,1.01,0,.37.15.67.44.9.29.23.63.29.98.19l6.5-1.76c28.79-10.61,61.85-16.22,95.64-16.22s66.38,5.53,95.03,15.99l1.56.36c.57.13.99-.08,1.25-.28.25-.2.56-.56.56-1.15,0-.5-.25-.96-.67-1.23l-5.23-3.38c-5.35-3.46-8.54-9.33-8.54-15.7v-39.51c0-4.76,3.86-8.61,8.61-8.61s8.61,3.86,8.61,8.61v39.51c0,.5.25.96.67,1.23l5.23,3.38c5.35,3.46,8.54,9.33,8.54,15.7,0,5.74-2.58,11.08-7.08,14.65-4.5,3.57-10.28,4.87-15.88,3.56l-2.59-.6-.5-.18c-26.88-9.89-57.85-15.12-89.58-15.12s-63.04,5.28-90.02,15.28l-.74.24-6.87,1.86c-1.61.44-3.24.65-4.86.65Z"/>
  <path class="cls-4" d="M301.81,261.53c-26.68-8.66-56.53-13.23-86.97-13.23-33.05,0-65.39,5.38-93.73,15.54-4.39,6.02-8.16,12.64-11.16,19.54.8.11,1.6.17,2.41.17,1.62,0,3.25-.21,4.86-.65l6.87-1.86.74-.24c26.98-10,58.11-15.28,90.02-15.28s62.7,5.23,89.58,15.12l.5.18,2.59.6c3.05.71,6.15.65,9.07-.13-4.51-6.82-9.74-13.24-14.76-19.77Z"/>
  <path class="cls-2" d="M326.41,204.22c-18.94,0-36.81-6.84-54.18-13.49l-3.83-1.46c-20.06-7.63-40.04-8.76-57.79-3.26-4.55,1.4-9.37-1.14-10.78-5.68-1.41-4.54,1.14-9.37,5.68-10.78,21.46-6.65,45.32-5.4,69.01,3.61l3.86,1.47c18.15,6.95,36.91,14.13,55,11.94,13.93-1.69,28.3-9.08,42.72-21.96,11.31-10.1,18.7-19.98,22.6-30.21,7.9-20.7.68-46.6-16.79-60.23s-44.34-14.34-62.51-1.65c-3.9,2.72-9.27,1.77-11.99-2.13-2.72-3.9-1.77-9.27,2.13-11.99,24.51-17.12,59.4-16.2,82.97,2.19,23.57,18.39,32.94,52.02,22.29,79.95-4.9,12.86-13.81,24.94-27.22,36.91-17.1,15.27-34.63,24.09-52.13,26.21-3.05.37-6.06.54-9.06.54Z"/>
  <path class="cls-2" d="M300.56,124.26c-2.06,0-4.13-.74-5.78-2.23-3.52-3.2-3.79-8.64-.6-12.17,11.07-12.22,14-31.81,7.29-48.75-6.29-15.88-20.31-29.24-38.46-36.65-15.98-6.53-34.92-8.65-56.3-6.31-21.89,2.4-39.48,8.9-52.27,19.33-14.69,11.98-22.61,30.01-20.16,45.95.72,4.7-2.51,9.1-7.21,9.82-4.71.72-9.1-2.51-9.82-7.21-3.35-21.85,6.98-46.15,26.31-61.91,15.41-12.56,36.03-20.33,61.28-23.1,24.26-2.66,46.03-.14,64.7,7.49,22.46,9.18,39.94,26.04,47.95,46.25,9.08,22.91,4.84,49.7-10.54,66.67-1.7,1.88-4.04,2.83-6.38,2.83Z"/>
  <path class="cls-2" d="M77.63,212.31c-26.89,0-53.31-14.28-67.04-36.7-15.31-25-13.9-58.41,3.42-81.24,16.65-21.94,46.97-33.27,77.24-28.86,19.57,2.85,38.32,11.83,52.79,25.3,3.48,3.24,3.68,8.69.44,12.17-3.24,3.48-8.69,3.68-12.17.44-11.94-11.11-27.4-18.52-43.54-20.87-24.16-3.52-48.12,5.2-61.04,22.22-12.93,17.04-13.96,43.04-2.45,61.83,11.4,18.62,34.16,29.99,56.66,28.31,13.2-.99,26.95-5.92,44.56-16,5.04-2.88,10.13-6.01,15.05-9.03,9.64-5.92,19.61-12.05,30.24-17.03,29.7-13.92,63.82-18.28,96.08-12.29,4.68.87,7.76,5.37,6.89,10.04-.87,4.68-5.36,7.76-10.04,6.89-28.74-5.34-59.15-1.46-85.62,10.95-9.75,4.57-18.87,10.17-28.53,16.11-5.04,3.09-10.24,6.29-15.51,9.31-13.43,7.68-31.46,16.7-51.83,18.22-1.86.14-3.73.21-5.6.21Z"/>
  <path class="cls-3" d="M381.93,74.18c-16.77-13.08-42.19-14.26-60.27-3.11,2.35,18.44-2.88,37.31-14.71,50.36-1.7,1.88-4.04,2.83-6.38,2.83-2.06,0-4.13-.74-5.78-2.23-3.52-3.2-3.79-8.64-.6-12.17,11.07-12.22,14-31.81,7.29-48.75-6.29-15.88-20.31-29.24-38.46-36.65-15.98-6.53-34.92-8.65-56.3-6.31-21.89,2.4-39.48,8.9-52.27,19.33-14.5,11.82-22.39,29.55-20.24,45.33,3.45,2.45,6.76,5.12,9.85,8,3.48,3.24,3.68,8.69.44,12.17-3.24,3.48-8.69,3.68-12.17.44-11.94-11.11-27.4-18.52-43.54-20.87-24.16-3.52-48.12,5.2-61.04,22.22-12.93,17.04-13.96,43.04-2.45,61.83,11.4,18.62,34.16,29.99,56.66,28.31,13.2-.99,26.95-5.92,44.56-16,5.04-2.88,10.13-6.01,15.05-9.03,9.64-5.92,19.61-12.05,30.24-17.03,29.7-13.92,63.82-18.28,96.08-12.29,4.68.87,7.76,5.37,6.89,10.04-.87,4.68-5.36,7.76-10.04,6.89-28.74-5.34-59.15-1.46-85.62,10.95-9.75,4.57-18.87,10.17-28.53,16.11-5.04,3.09-10.24,6.29-15.51,9.31-1.48.85-3.03,1.71-4.62,2.58v36.85c0,6.9-3.81,13.16-9.95,16.32l-8.61,4.44c-.38.2-.61.58-.61,1.01,0,.37.15.67.44.9.29.23.63.29.98.19l6.5-1.76c28.79-10.61,61.85-16.22,95.64-16.22s66.38,5.53,95.03,15.99l1.56.36c.57.13.99-.08,1.25-.28.25-.2.56-.56.56-1.15,0-.5-.25-.96-.67-1.23l-5.23-3.38c-5.35-3.46-8.54-9.33-8.54-15.7v-32.8c-9.02-2.54-17.85-5.92-26.55-9.25l-3.83-1.46c-20.06-7.63-40.04-8.76-57.79-3.26-4.55,1.4-9.37-1.14-10.78-5.68-1.41-4.54,1.14-9.37,5.68-10.78,21.46-6.65,45.32-5.4,69.01,3.61l3.86,1.47c18.15,6.95,36.91,14.13,55,11.94,13.93-1.69,28.3-9.08,42.72-21.96,11.31-10.1,18.7-19.98,22.6-30.21,7.9-20.7.68-46.6-16.79-60.23Z"/>
  <g class="cls-5">
    <path class="cls-2" d="M368.69,163.24c-12.44,7.65-26.48,10.77-40.94,11.67-16.37,1.02-33.94-1.39-50.89-.85l1.53.58c18.15,6.95,36.91,14.13,55,11.94,13.93-1.69,28.3-9.08,42.72-21.96,9.16-8.18,15.74-16.21,19.99-24.41-7.54,9.3-17.28,16.79-27.42,23.02Z"/>
  </g>
  <g class="cls-5">
    <path class="cls-2" d="M137.38,85.18c1.12-8.23,3.93-16.54,7.08-23.76,4.39-10.08,10.6-19.42,19.22-26.36,5.71-4.59,11.9-8.45,18.34-11.89-10.79,3.38-20.03,8.16-27.58,14.31-14.5,11.82-22.39,29.55-20.24,45.33,1.08.77,2.14,1.56,3.18,2.37Z"/>
    <path class="cls-2" d="M142.43,164.74c-10.01,5.85-20.04,12.02-31.34,15.06-11.77,3.17-24.27,3.83-36.36,2.43-20.44-2.37-38.82-13.91-46.05-33.88-3.4-9.37-4.41-20.11-2.16-29.85,2.34-10.07,8.48-18.59,15.56-25.92.64-.66,1.29-1.3,1.94-1.94-6.39,3.69-11.96,8.45-16.28,14.15-12.93,17.04-13.96,43.04-2.45,61.83,11.4,18.62,34.16,29.99,56.66,28.31,13.2-.99,26.95-5.92,44.56-16,5.04-2.88,10.13-6.01,15.05-9.03,9.64-5.92,19.61-12.05,30.24-17.03,1.74-.82,3.5-1.6,5.27-2.35-12.36,2.86-23.64,7.79-34.63,14.22Z"/>
    <path class="cls-2" d="M155.19,227.32c-8.33-8.01-12.81-17.37-10.43-28.94,0-.04.01-.07.02-.11,1.36-6.52,5.52-12.11,11.22-15.56,8.57-5.19,17.67-9.59,26.91-13.34,17.04-6.92,34.96-11.22,53.13-14.15-19.62.44-39.16,4.9-56.93,13.23-9.75,4.57-18.87,10.17-28.53,16.11-.61.38-1.23.76-1.85,1.13h0c-2.11,1.3-4.26,2.61-6.42,3.91-.26.15-.51.31-.77.46-2.14,1.29-4.31,2.57-6.48,3.81-1.48.85-3.03,1.71-4.62,2.58v36.85c0,6.9-3.81,13.16-9.95,16.32l-8.61,4.44c-.38.2-.61.58-.61,1.01,0,.37.15.67.44.9.29.23.63.29.98.19l6.5-1.76c22.52-8.3,47.66-13.52,73.71-15.41-2.61-.37-5.27-.53-8.01-.68-11.42-.62-21.25-2.86-29.71-10.99Z"/>
    <path class="cls-2" d="M268.41,189.27c-19.21-7.31-38.35-8.63-55.53-3.9,3.43,2.52,7.86,3.79,12.18,4.53,9.53,1.65,19.26,1.67,28.84,2.94,15.35,2.02,30.65,7.59,44.88,14.33v-7.18c-9.02-2.54-17.85-5.92-26.55-9.25l-3.83-1.46Z"/>
  </g>
                </svg>
            </div></div>
            
            <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-2 md:space-y-0 sm:space-x-2 mt-2 pb-4">
  {/* Search attributes input */}
  <div className="flex-1 w-full pl-3 pr-1">
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search attributes..."
      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>

  {/* Dropdown for selecting meal types */}
  <div className="flex-1 px-2 w-full">
    <select
      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={mealType}
      onChange={(e) => setMealType(e.target.value)}
    >
      <option value="all">All Meals</option>
      <option value="Breakfast">Breakfast</option>
      <option value="Lunch">Lunch</option>
      <option value="Dinner">Dinner</option>
      <option value="Desserts">Desserts</option>
      <option value="Snacks">Snacks</option>
    </select>
  </div>

  {/* Community filter dropdown */}
  <div className="flex-1 px-2 w-full">
    <select
      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={community}
      onChange={(e) => setCommunity(e.target.value)}
    >
      <option value="All Communities">All Communities</option>
      <option value="Avax Apes">Avax Apes</option>
      <option value="Cuddlefish">Cuddlefish</option>
      <option value="Kingshit">Kingshit</option>
      <option value="Steady">Steady</option>
      <option value="The Spot">The Spot</option>
      <option value="The Arena">The Arena</option>
      <option value="No Chill">No Chill</option>
      <option value="Cozyverse">Cozyverse</option>
      <option value="Quirkies">Quirkies</option>
      <option value="Creature World">Creature World</option>
    </select>
  </div>

  {/* Sort by tips button 
  <div className="flex-1 px-2">
          <button
            onClick={toggleSortTips}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Sort by Tips {sortTips ? " (Descending)" : " (Unsorted)"}
          </button>
        </div>*/}

  {/* Sort by likes button
  <div className="flex-1 px-2">
    <button
      onClick={toggleSortLikes}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
    >
      Sort by Likes {sortLikes ? " (Descending)" : " (Unsorted)"}
    </button>
  </div> */}

  {/* Show Bookmarks toggle button */}
  <div className="flex-1 px-2 w-full">
    <button
      onClick={toggleBookmarks}
      className="bg-avax-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
    >
      {showBookmarks ? "Show All" : "Show Bookmarked"}
    </button>
  </div>
</div>

     
      <div className="relative flex flex-wrap justify-center z-10 opacity-95">
      {displayTokens.slice().reverse().map((token, index) => (
          <NFTCard key={index} token={token} account={account} showBookmarks={showBookmarks} onTipsFetch={handleTipsFetch} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
         {/* Bottom-left Fixed Image */}
         <div className="fixed bottom-20 left-10 w-96 h-96 pointer-events-none z-0 hidden md:block opacity-100">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 419.18 474.09">
                    <defs>
                        <style>
                            {`.cls-1 { fill: #e84142; fill-rule: evenodd; }
                            .cls-1, .cls-2, .cls-3, .cls-4 { stroke-width: 0px; }
                            .cls-2, .cls-4 { fill: #000; }
                            .cls-5, .cls-4 { opacity: .39; }
                            .cls-6 { fill: none; stroke-linecap: round; }
                            .cls-6, .cls-7 { stroke: #000; stroke-miterlimit: 10; stroke-width: 18px; }
                            .cls-3 { fill: #f3f2f2; }
                            .cls-7 { fill: #fff; }`}
                        </style>
                    </defs>
                    <circle className="cls-7" cx="214.84" cy="345.61" r="97.32"/>
                    <g>
    <path class="cls-1" d="M334.71,345.61c0,66.2-53.67,119.87-119.87,119.87s-119.87-53.67-119.87-119.87,53.67-119.87,119.87-119.87,119.87,53.67,119.87,119.87ZM180.87,393.32h-23.26c-4.89,0-7.3,0-8.77-.94-1.59-1.03-2.56-2.74-2.68-4.62-.09-1.74,1.12-3.86,3.53-8.1l57.44-101.24c2.44-4.3,3.68-6.45,5.24-7.24,1.68-.85,3.68-.85,5.36,0,1.56.8,2.8,2.94,5.24,7.24l11.81,20.61.06.11c2.64,4.61,3.98,6.95,4.56,9.41.65,2.68.65,5.51,0,8.19-.59,2.47-1.91,4.83-4.59,9.51l-30.17,53.33-.08.14c-2.66,4.65-4,7.01-5.87,8.79-2.03,1.94-4.48,3.36-7.16,4.15-2.44.68-5.18.68-10.66.68ZM239.62,393.32h33.33c4.92,0,7.39,0,8.86-.97,1.59-1.03,2.59-2.77,2.68-4.65.08-1.68-1.1-3.72-3.41-7.71-.08-.14-.16-.27-.24-.42l-16.7-28.56-.19-.32c-2.35-3.97-3.53-5.97-5.05-6.75-1.68-.85-3.65-.85-5.33,0-1.53.8-2.77,2.89-5.21,7.1l-16.64,28.56-.06.1c-2.44,4.2-3.65,6.31-3.56,8.03.12,1.88,1.09,3.62,2.68,4.65,1.44.94,3.92.94,8.83.94Z"/>
    <path class="cls-2" d="M214.84,474.09c-70.84,0-128.48-57.64-128.48-128.48s57.64-128.48,128.48-128.48,128.48,57.64,128.48,128.48-57.64,128.48-128.48,128.48ZM214.84,234.36c-61.35,0-111.25,49.91-111.25,111.25s49.91,111.25,111.25,111.25,111.25-49.91,111.25-111.25-49.91-111.25-111.25-111.25ZM272.95,401.93h-33.33c-6.21,0-9.95,0-13.54-2.34-3.82-2.48-6.28-6.72-6.57-11.33v-.11c-.22-4.27,1.63-7.47,4.71-12.78l.06-.11,16.64-28.57c2.95-5.08,4.9-8.44,8.68-10.4,4.18-2.13,9.09-2.13,13.21-.03,3.75,1.91,5.66,5.14,8.55,10.04l.19.32,16.97,29.03c2.88,4.98,4.78,8.25,4.57,12.48-.22,4.62-2.68,8.91-6.6,11.44-3.58,2.36-7.33,2.36-13.55,2.36ZM276.05,388.72h0s0,0,0,0ZM238.72,384.7h35.14c-.08-.13-.16-.27-.23-.4l-.25-.44-16.84-28.8c-.09-.16-.19-.32-.28-.48-.15.26-.3.52-.45.77l-16.7,28.66c-.13.22-.26.45-.4.68ZM234.17,384.56h0ZM278.37,384.56h0ZM180.87,401.93h-23.26c-6.12,0-9.82,0-13.41-2.3-3.89-2.52-6.35-6.75-6.64-11.34v-.1c-.22-4.25,1.61-7.47,4.65-12.8l57.43-101.23c2.98-5.23,4.94-8.69,8.82-10.67,4.13-2.1,9.06-2.1,13.18,0,3.89,1.98,5.85,5.44,8.82,10.66l11.86,20.7c2.86,5,4.59,8.02,5.46,11.68.96,3.97.96,8.2,0,12.2-.89,3.72-2.62,6.75-5.49,11.77l-30.25,53.47c-2.89,5.05-4.63,8.1-7.41,10.75-2.98,2.85-6.67,4.99-10.64,6.17l-.16.04c-3.57.99-6.91.99-12.96.99ZM156.73,384.7h24.15c4.32,0,6.95,0,8.29-.35,1.35-.42,2.55-1.12,3.57-2.09.97-.92,2.24-3.15,4.35-6.83l.08-.14,30.15-53.3c2.24-3.91,3.41-5.99,3.71-7.27.33-1.38.33-2.81,0-4.17-.3-1.28-1.57-3.49-3.67-7.15l-11.87-20.72c-.14-.26-.3-.52-.45-.79-.15.26-.29.51-.43.76l-57.43,101.24c-.15.26-.3.53-.45.8Z"/>
  </g>
  <path class="cls-2" d="M112.36,273.44c-3.97,0-7.85-1.3-11.11-3.79-4.58-3.5-7.21-8.82-7.21-14.58,0-6.91,3.81-13.16,9.95-16.32l8.6-4.43c.38-.2.61-.58.61-1.01v-39.75c0-4.76,3.86-8.61,8.61-8.61s8.61,3.86,8.61,8.61v39.75c0,6.9-3.81,13.16-9.95,16.32l-8.61,4.44c-.38.2-.61.58-.61,1.01,0,.37.15.67.44.9.29.23.63.29.98.19l6.5-1.76c28.79-10.61,61.85-16.22,95.64-16.22s66.38,5.53,95.03,15.99l1.56.36c.57.13.99-.08,1.25-.28.25-.2.56-.56.56-1.15,0-.5-.25-.96-.67-1.23l-5.23-3.38c-5.35-3.46-8.54-9.33-8.54-15.7v-39.51c0-4.76,3.86-8.61,8.61-8.61s8.61,3.86,8.61,8.61v39.51c0,.5.25.96.67,1.23l5.23,3.38c5.35,3.46,8.54,9.33,8.54,15.7,0,5.74-2.58,11.08-7.08,14.65-4.5,3.57-10.28,4.87-15.88,3.56l-2.59-.6-.5-.18c-26.88-9.89-57.85-15.12-89.58-15.12s-63.04,5.28-90.02,15.28l-.74.24-6.87,1.86c-1.61.44-3.24.65-4.86.65Z"/>
  <path class="cls-4" d="M301.81,261.53c-26.68-8.66-56.53-13.23-86.97-13.23-33.05,0-65.39,5.38-93.73,15.54-4.39,6.02-8.16,12.64-11.16,19.54.8.11,1.6.17,2.41.17,1.62,0,3.25-.21,4.86-.65l6.87-1.86.74-.24c26.98-10,58.11-15.28,90.02-15.28s62.7,5.23,89.58,15.12l.5.18,2.59.6c3.05.71,6.15.65,9.07-.13-4.51-6.82-9.74-13.24-14.76-19.77Z"/>
  <path class="cls-2" d="M326.41,204.22c-18.94,0-36.81-6.84-54.18-13.49l-3.83-1.46c-20.06-7.63-40.04-8.76-57.79-3.26-4.55,1.4-9.37-1.14-10.78-5.68-1.41-4.54,1.14-9.37,5.68-10.78,21.46-6.65,45.32-5.4,69.01,3.61l3.86,1.47c18.15,6.95,36.91,14.13,55,11.94,13.93-1.69,28.3-9.08,42.72-21.96,11.31-10.1,18.7-19.98,22.6-30.21,7.9-20.7.68-46.6-16.79-60.23s-44.34-14.34-62.51-1.65c-3.9,2.72-9.27,1.77-11.99-2.13-2.72-3.9-1.77-9.27,2.13-11.99,24.51-17.12,59.4-16.2,82.97,2.19,23.57,18.39,32.94,52.02,22.29,79.95-4.9,12.86-13.81,24.94-27.22,36.91-17.1,15.27-34.63,24.09-52.13,26.21-3.05.37-6.06.54-9.06.54Z"/>
  <path class="cls-2" d="M300.56,124.26c-2.06,0-4.13-.74-5.78-2.23-3.52-3.2-3.79-8.64-.6-12.17,11.07-12.22,14-31.81,7.29-48.75-6.29-15.88-20.31-29.24-38.46-36.65-15.98-6.53-34.92-8.65-56.3-6.31-21.89,2.4-39.48,8.9-52.27,19.33-14.69,11.98-22.61,30.01-20.16,45.95.72,4.7-2.51,9.1-7.21,9.82-4.71.72-9.1-2.51-9.82-7.21-3.35-21.85,6.98-46.15,26.31-61.91,15.41-12.56,36.03-20.33,61.28-23.1,24.26-2.66,46.03-.14,64.7,7.49,22.46,9.18,39.94,26.04,47.95,46.25,9.08,22.91,4.84,49.7-10.54,66.67-1.7,1.88-4.04,2.83-6.38,2.83Z"/>
  <path class="cls-2" d="M77.63,212.31c-26.89,0-53.31-14.28-67.04-36.7-15.31-25-13.9-58.41,3.42-81.24,16.65-21.94,46.97-33.27,77.24-28.86,19.57,2.85,38.32,11.83,52.79,25.3,3.48,3.24,3.68,8.69.44,12.17-3.24,3.48-8.69,3.68-12.17.44-11.94-11.11-27.4-18.52-43.54-20.87-24.16-3.52-48.12,5.2-61.04,22.22-12.93,17.04-13.96,43.04-2.45,61.83,11.4,18.62,34.16,29.99,56.66,28.31,13.2-.99,26.95-5.92,44.56-16,5.04-2.88,10.13-6.01,15.05-9.03,9.64-5.92,19.61-12.05,30.24-17.03,29.7-13.92,63.82-18.28,96.08-12.29,4.68.87,7.76,5.37,6.89,10.04-.87,4.68-5.36,7.76-10.04,6.89-28.74-5.34-59.15-1.46-85.62,10.95-9.75,4.57-18.87,10.17-28.53,16.11-5.04,3.09-10.24,6.29-15.51,9.31-13.43,7.68-31.46,16.7-51.83,18.22-1.86.14-3.73.21-5.6.21Z"/>
  <path class="cls-3" d="M381.93,74.18c-16.77-13.08-42.19-14.26-60.27-3.11,2.35,18.44-2.88,37.31-14.71,50.36-1.7,1.88-4.04,2.83-6.38,2.83-2.06,0-4.13-.74-5.78-2.23-3.52-3.2-3.79-8.64-.6-12.17,11.07-12.22,14-31.81,7.29-48.75-6.29-15.88-20.31-29.24-38.46-36.65-15.98-6.53-34.92-8.65-56.3-6.31-21.89,2.4-39.48,8.9-52.27,19.33-14.5,11.82-22.39,29.55-20.24,45.33,3.45,2.45,6.76,5.12,9.85,8,3.48,3.24,3.68,8.69.44,12.17-3.24,3.48-8.69,3.68-12.17.44-11.94-11.11-27.4-18.52-43.54-20.87-24.16-3.52-48.12,5.2-61.04,22.22-12.93,17.04-13.96,43.04-2.45,61.83,11.4,18.62,34.16,29.99,56.66,28.31,13.2-.99,26.95-5.92,44.56-16,5.04-2.88,10.13-6.01,15.05-9.03,9.64-5.92,19.61-12.05,30.24-17.03,29.7-13.92,63.82-18.28,96.08-12.29,4.68.87,7.76,5.37,6.89,10.04-.87,4.68-5.36,7.76-10.04,6.89-28.74-5.34-59.15-1.46-85.62,10.95-9.75,4.57-18.87,10.17-28.53,16.11-5.04,3.09-10.24,6.29-15.51,9.31-1.48.85-3.03,1.71-4.62,2.58v36.85c0,6.9-3.81,13.16-9.95,16.32l-8.61,4.44c-.38.2-.61.58-.61,1.01,0,.37.15.67.44.9.29.23.63.29.98.19l6.5-1.76c28.79-10.61,61.85-16.22,95.64-16.22s66.38,5.53,95.03,15.99l1.56.36c.57.13.99-.08,1.25-.28.25-.2.56-.56.56-1.15,0-.5-.25-.96-.67-1.23l-5.23-3.38c-5.35-3.46-8.54-9.33-8.54-15.7v-32.8c-9.02-2.54-17.85-5.92-26.55-9.25l-3.83-1.46c-20.06-7.63-40.04-8.76-57.79-3.26-4.55,1.4-9.37-1.14-10.78-5.68-1.41-4.54,1.14-9.37,5.68-10.78,21.46-6.65,45.32-5.4,69.01,3.61l3.86,1.47c18.15,6.95,36.91,14.13,55,11.94,13.93-1.69,28.3-9.08,42.72-21.96,11.31-10.1,18.7-19.98,22.6-30.21,7.9-20.7.68-46.6-16.79-60.23Z"/>
  <g class="cls-5">
    <path class="cls-2" d="M368.69,163.24c-12.44,7.65-26.48,10.77-40.94,11.67-16.37,1.02-33.94-1.39-50.89-.85l1.53.58c18.15,6.95,36.91,14.13,55,11.94,13.93-1.69,28.3-9.08,42.72-21.96,9.16-8.18,15.74-16.21,19.99-24.41-7.54,9.3-17.28,16.79-27.42,23.02Z"/>
  </g>
  <g class="cls-5">
    <path class="cls-2" d="M137.38,85.18c1.12-8.23,3.93-16.54,7.08-23.76,4.39-10.08,10.6-19.42,19.22-26.36,5.71-4.59,11.9-8.45,18.34-11.89-10.79,3.38-20.03,8.16-27.58,14.31-14.5,11.82-22.39,29.55-20.24,45.33,1.08.77,2.14,1.56,3.18,2.37Z"/>
    <path class="cls-2" d="M142.43,164.74c-10.01,5.85-20.04,12.02-31.34,15.06-11.77,3.17-24.27,3.83-36.36,2.43-20.44-2.37-38.82-13.91-46.05-33.88-3.4-9.37-4.41-20.11-2.16-29.85,2.34-10.07,8.48-18.59,15.56-25.92.64-.66,1.29-1.3,1.94-1.94-6.39,3.69-11.96,8.45-16.28,14.15-12.93,17.04-13.96,43.04-2.45,61.83,11.4,18.62,34.16,29.99,56.66,28.31,13.2-.99,26.95-5.92,44.56-16,5.04-2.88,10.13-6.01,15.05-9.03,9.64-5.92,19.61-12.05,30.24-17.03,1.74-.82,3.5-1.6,5.27-2.35-12.36,2.86-23.64,7.79-34.63,14.22Z"/>
    <path class="cls-2" d="M155.19,227.32c-8.33-8.01-12.81-17.37-10.43-28.94,0-.04.01-.07.02-.11,1.36-6.52,5.52-12.11,11.22-15.56,8.57-5.19,17.67-9.59,26.91-13.34,17.04-6.92,34.96-11.22,53.13-14.15-19.62.44-39.16,4.9-56.93,13.23-9.75,4.57-18.87,10.17-28.53,16.11-.61.38-1.23.76-1.85,1.13h0c-2.11,1.3-4.26,2.61-6.42,3.91-.26.15-.51.31-.77.46-2.14,1.29-4.31,2.57-6.48,3.81-1.48.85-3.03,1.71-4.62,2.58v36.85c0,6.9-3.81,13.16-9.95,16.32l-8.61,4.44c-.38.2-.61.58-.61,1.01,0,.37.15.67.44.9.29.23.63.29.98.19l6.5-1.76c22.52-8.3,47.66-13.52,73.71-15.41-2.61-.37-5.27-.53-8.01-.68-11.42-.62-21.25-2.86-29.71-10.99Z"/>
    <path class="cls-2" d="M268.41,189.27c-19.21-7.31-38.35-8.63-55.53-3.9,3.43,2.52,7.86,3.79,12.18,4.53,9.53,1.65,19.26,1.67,28.84,2.94,15.35,2.02,30.65,7.59,44.88,14.33v-7.18c-9.02-2.54-17.85-5.92-26.55-9.25l-3.83-1.46Z"/>
  </g>
                </svg>
            </div>
         {/*}   <TipDisplay displayTokens={displayTokens} />*/}
    </div>
  );
};

export default Gallery;
