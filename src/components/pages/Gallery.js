import React, { useState, useEffect, useRef } from "react";
import NFTCard from "./NFTCard";
import { useLocation } from 'react-router-dom';
import UserProfileCard from "../../components/userProfileCard"; // Create this new component
import { ethers, Contract } from "ethers";
import { AVAXCOOKSLIKESANDTIPS_ABI, AVAXCOOKSLIKESANDTIPS_ADDRESS } from '../Contracts/AvaxCooksLikeAndTip';
import userProfiles from '../../userProfiles'; // Import user profiles JSON
import logo from "../../assets/iprs_spot.png";
import logothin from "../../assets/iprs_thin.png";
import { signInAnonymously } from "../../firebase3";
import Moralis from 'moralis';
import { sanitizeName } from "../../utils";

import image1 from "../../assets/nft_images/1.jpg";
import image2 from "../../assets/nft_images/2.jpg";
import image3 from "../../assets/nft_images/3.jpg";
import image4 from "../../assets/nft_images/4.jpg";
import image5 from "../../assets/nft_images/5.jpg";
import image6 from "../../assets/nft_images/6.jpg";
import image7 from "../../assets/nft_images/7.jpg";
import image8 from "../../assets/nft_images/8.jpg";
import image9 from "../../assets/nft_images/9.jpg";
import image10 from "../../assets/nft_images/10.jpg";
import image11 from "../../assets/nft_images/11.jpg";
import image12 from "../../assets/nft_images/12.jpg";
import image13 from "../../assets/nft_images/13.jpg";
import image14 from "../../assets/nft_images/14.jpg";
import image15 from "../../assets/nft_images/15.jpg";
import image16 from "../../assets/nft_images/16.jpg";
import image17 from "../../assets/nft_images/17.jpg";
import image18 from "../../assets/nft_images/18.jpg";
import image19 from "../../assets/nft_images/19.jpg";
import image20 from "../../assets/nft_images/20.jpg";
import image21 from "../../assets/nft_images/21.jpg";
import image22 from "../../assets/nft_images/22.jpg";
import image23 from "../../assets/nft_images/23.jpg";
import image24 from "../../assets/nft_images/24.jpg";
import image25 from "../../assets/nft_images/25.jpg";
import image26 from "../../assets/nft_images/26.jpg";
import image27 from "../../assets/nft_images/27.jpg";
import image28 from "../../assets/nft_images/28.jpg";
import image29 from "../../assets/nft_images/29.jpg";
import image30 from "../../assets/nft_images/30.jpg";
import image31 from "../../assets/nft_images/31.jpg";
import image32 from "../../assets/nft_images/32.jpg";
import image33 from "../../assets/nft_images/33.jpg";
import image34 from "../../assets/nft_images/34.jpg";
import image35 from "../../assets/nft_images/35.jpg";
import image36 from "../../assets/nft_images/36.jpg";
import image37 from "../../assets/nft_images/37.jpg";
import image38 from "../../assets/nft_images/38.jpg";
import image39 from "../../assets/nft_images/39.jpg";
import image40 from "../../assets/nft_images/40.jpg";
import image41 from "../../assets/nft_images/41.jpg";
import image42 from "../../assets/nft_images/42.jpg";
import image43 from "../../assets/nft_images/43.jpg";
import image44 from "../../assets/nft_images/44.jpg";
import image45 from "../../assets/nft_images/45.jpg";
import image46 from "../../assets/nft_images/46.jpg";
import image47 from "../../assets/nft_images/47.jpg";
import image48 from "../../assets/nft_images/48.jpg";
import image49 from "../../assets/nft_images/49.jpg";
import image50 from "../../assets/nft_images/50.jpg";
import image51 from "../../assets/nft_images/51.jpg";
import image52 from "../../assets/nft_images/52.jpg";
import image53 from "../../assets/nft_images/53.jpg";
import image54 from "../../assets/nft_images/54.jpg";
import image55 from "../../assets/nft_images/55.jpg";
import image56 from "../../assets/nft_images/56.jpg";
import image57 from "../../assets/nft_images/57.jpg";
import image58 from "../../assets/nft_images/58.jpg";
import image59 from "../../assets/nft_images/59.jpg";
import image60 from "../../assets/nft_images/60.jpg";
import image61 from "../../assets/nft_images/61.jpg";
import image62 from "../../assets/nft_images/62.jpg";
import image63 from "../../assets/nft_images/63.jpg";
import image64 from "../../assets/nft_images/64.jpg";
import image65 from "../../assets/nft_images/65.jpg";
import image66 from "../../assets/nft_images/66.jpg";
import image67 from "../../assets/nft_images/67.jpg";
import image68 from "../../assets/nft_images/68.jpg";
import image69 from "../../assets/nft_images/69.jpg";
import image70 from "../../assets/nft_images/70.jpg";
import image71 from "../../assets/nft_images/71.jpg";
import image72 from "../../assets/nft_images/72.jpg";
import image73 from "../../assets/nft_images/73.jpg";
import image74 from "../../assets/nft_images/74.jpg";
import image75 from "../../assets/nft_images/75.jpg";
import image76 from "../../assets/nft_images/76.jpg";
import image77 from "../../assets/nft_images/77.jpg";
import image78 from "../../assets/nft_images/78.jpg";
import image79 from "../../assets/nft_images/79.jpg";
import image80 from "../../assets/nft_images/80.jpg";
import image81 from "../../assets/nft_images/81.jpg";
import image82 from "../../assets/nft_images/82.jpg";
import image83 from "../../assets/nft_images/83.jpg";
import image84 from "../../assets/nft_images/84.jpg";
import image85 from "../../assets/nft_images/85.jpg";
import image86 from "../../assets/nft_images/86.jpg";
import image87 from "../../assets/nft_images/87.jpg";
import image88 from "../../assets/nft_images/88.jpg";
import image89 from "../../assets/nft_images/89.jpg";
import image90 from "../../assets/nft_images/90.jpg";
import image91 from "../../assets/nft_images/91.jpg";
import image92 from "../../assets/nft_images/92.jpg";
import image93 from "../../assets/nft_images/93.jpg";
import image94 from "../../assets/nft_images/94.jpg";
import image95 from "../../assets/nft_images/95.jpg";
import image96 from "../../assets/nft_images/96.jpg";
import image97 from "../../assets/nft_images/97.jpg";
import image98 from "../../assets/nft_images/98.jpg";
import image99 from "../../assets/nft_images/99.jpg";
import image100 from "../../assets/nft_images/100.jpg";
import image101 from "../../assets/nft_images/101.jpg";
import image102 from "../../assets/nft_images/102.jpg";
import image103 from "../../assets/nft_images/103.jpg";
import image104 from "../../assets/nft_images/104.jpg";
import image105 from "../../assets/nft_images/105.jpg";
import image107 from "../../assets/nft_images/107.jpg";
import image108 from "../../assets/nft_images/108.jpg";
import image109 from "../../assets/nft_images/109.jpg";
import image110 from "../../assets/nft_images/110.jpg";
import image111 from "../../assets/nft_images/111.jpg";
import image112 from "../../assets/nft_images/112.jpg";
import image113 from "../../assets/nft_images/113.jpg";
import image114 from "../../assets/nft_images/114.jpg";
import image115 from "../../assets/nft_images/115.jpg";
import image116 from "../../assets/nft_images/116.jpg";
import image117 from "../../assets/nft_images/117.jpg";
import image118 from "../../assets/nft_images/118.jpg";
import image119 from "../../assets/nft_images/119.jpg";
import image120 from "../../assets/nft_images/120.jpg";
import image121 from "../../assets/nft_images/121.jpg";
import image122 from "../../assets/nft_images/122.jpg";
import image123 from "../../assets/nft_images/123.jpg";
import image124 from "../../assets/nft_images/124.jpg";
import image125 from "../../assets/nft_images/125.jpg";
import image126 from "../../assets/nft_images/126.jpg";
import image127 from "../../assets/nft_images/127.jpg";
import image128 from "../../assets/nft_images/128.jpg";
import image129 from "../../assets/nft_images/129.jpg";
import image130 from "../../assets/nft_images/130.jpg";
import image131 from "../../assets/nft_images/131.jpg";
import image132 from "../../assets/nft_images/132.jpg";
import image133 from "../../assets/nft_images/133.jpg";
import image134 from "../../assets/nft_images/134.jpg";
import image135 from "../../assets/nft_images/135.jpg";
import image136 from "../../assets/nft_images/136.jpg";
import image137 from "../../assets/nft_images/137.jpg";
import image138 from "../../assets/nft_images/138.jpg";
import image139 from "../../assets/nft_images/139.jpg";
import image140 from "../../assets/nft_images/140.jpg";
import image141 from "../../assets/nft_images/141.jpg";
import image142 from "../../assets/nft_images/142.jpg";
import image143 from "../../assets/nft_images/143.jpg";
import image144 from "../../assets/nft_images/144.jpg";
import image145 from "../../assets/nft_images/145.jpg";
import image146 from "../../assets/nft_images/146.jpg";
import image147 from "../../assets/nft_images/147.jpg";
import image148 from "../../assets/nft_images/148.jpg";
import image149 from "../../assets/nft_images/149.jpg";
import image150 from "../../assets/nft_images/150.jpg";
import image151 from "../../assets/nft_images/151.jpg";
import image152 from "../../assets/nft_images/152.jpg";
import image153 from "../../assets/nft_images/153.jpg";
import image154 from "../../assets/nft_images/154.jpg";
import image155 from "../../assets/nft_images/155.jpg";
import image156 from "../../assets/nft_images/156.jpg";
import image157 from "../../assets/nft_images/157.jpg";
import image158 from "../../assets/nft_images/158.jpg";
import image159 from "../../assets/nft_images/159.jpg";
import image160 from "../../assets/nft_images/160.jpg";
import image161 from "../../assets/nft_images/161.jpg";
import image162 from "../../assets/nft_images/162.jpg";
import image163 from "../../assets/nft_images/163.jpg";
import image164 from "../../assets/nft_images/164.jpg";
import image165 from "../../assets/nft_images/165.jpg";
import image166 from "../../assets/nft_images/166.jpg";
import image167 from "../../assets/nft_images/167.jpg";
import image168 from "../../assets/nft_images/168.jpg";
import image169 from "../../assets/nft_images/169.jpg";

const imageMapping = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
  6: image6,
  7: image7,
  8: image8,
  9: image9,
  10: image10,
  11: image11,
  12: image12,
  13: image13,
  14: image14,
  15: image15,
  16: image16,
  17: image17,
  18: image18,
  19: image19,
  20: image20,
  21: image21,
  22: image22,
  23: image23,
  24: image24,
  25: image25,
  26: image26,
  27: image27,
  28: image28,
  29: image29,
  30: image30,
  31: image31,
  32: image32,
  33: image33,
  34: image34,
  35: image35,
  36: image36,
  37: image37,
  38: image38,
  39: image39,
  40: image40,
  41: image41,
  42: image42,
  43: image43,
  44: image44,
  45: image45,
  46: image46,
  47: image47,
  48: image48,
  49: image49,
  50: image50,
  51: image51,
  52: image52,
  53: image53,
  54: image54,
  55: image55,
  56: image56,
  57: image57,
  58: image58,
  59: image59,
  60: image60,
  61: image61,
  62: image62,
  63: image63,
  64: image64,
  65: image65,
  66: image66,
  67: image67,
  68: image68,
  69: image69,
  70: image70,
  71: image71,
  72: image72,
  73: image73,
  74: image74,
  75: image75,
  76: image76,
  77: image77,
  78: image78,
  79: image79,
  80: image80,
  81: image81,
  82: image82,
  83: image83,
  84: image84,
  85: image85,
  86: image86,
  87: image87,
  88: image88,
  89: image89,
  90: image90,
  91: image91,
  92: image92,
  93: image93,
  94: image94,
  95: image95,
  96: image96,
  97: image97,
  98: image98,
  99: image99,
  100: image100,
  101: image101,
  102: image102,
  103: image103,
  104: image104,
  105: image105,
  107: image107,
  108: image108,
  109: image109,
  110: image110,
  111: image111,
  112: image112,
  113: image113,
  114: image114,
  115: image115,
  116: image116,
  117: image117,
  118: image118,
  119: image119,
  120: image120,
  121: image121,
  122: image122,
  123: image123,
  124: image124,
  125: image125,
  126: image126,
  127: image127,
  128: image128,
  129: image129,
  130: image130,
  131: image131,
  132: image132,
  133: image133,
  134: image134,
  135: image135,
  136: image136,
  137: image137,
  138: image138,
  139: image139,
  140: image140,
  141: image141,
  142: image142,
  143: image143,
  144: image144,
  145: image145,
  146: image146,
  147: image147,
  148: image148,
  149: image149,
  150: image150,
  151: image151,
  152: image152,
  153: image153,
  154: image154,
  155: image155,
  156: image156,
  157: image157,
  158: image158,
  159: image159,
  160: image160,
  161: image161,
  162: image162,
  163: image163,
  164: image164,
  165: image165,
  166: image166,
  167: image167,
  168: image168,
  169: image169,
};

const ITEMS_PER_PAGE = 100; // Number of items per page

const Gallery = ({ account }) => {
  const [allTokens, setAllTokens] = useState([]);
  const [displayTokens, setDisplayTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCulinaryStarsMode, setIsCulinaryStarsMode] = useState(false); // New state for culinary stars mode
  const [pageToken, setPageToken] = useState(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [mealType, setMealType] = useState('all');
  const [sortLikes, setSortLikes] = useState(false);
  const [likes, setLikes] = useState(0);
  const [community, setCommunity] = useState('All Communities');
  const [searchText1, setSearchText1] = useState('');
  const [searchText2, setSearchText2] = useState('');
  const [searchText3, setSearchText3] = useState('');
  const [recipeNameSearch, setRecipeNameSearch] = useState('');
  const [contributorSearch, setContributorSearch] = useState('');
  const [sortOption, setSortOption] = useState('random');
  const [sortTips, setSortTips] = useState(false);
  const [tipsData, setTipsData] = useState({});
  const [expandedTokenId, setExpandedTokenId] = useState(null);
  const [viewMode, setViewMode] = useState('card'); // New state for view mode
  const apiKey = process.env.GLACIER_API_KEY;
  const moralisApiKey = process.env.MORALIS_API;
  const [moralisInitialized, setMoralisInitialized] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const recipeNameFromURL = queryParams.get('recipeName');
  const cardRefs = useRef({});
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);

  useEffect(() => {
    signInAnonymously();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };


  useEffect(() => {
    if (recipeNameFromURL) {
      const recipeNameWithSpaces = recipeNameFromURL.replace(/_/g, ' '); // Replace underscores with spaces
      setRecipeNameSearch(recipeNameWithSpaces);
    }
  }, [recipeNameFromURL]);
 

  const handleTipsFetch = (tokenId, tips) => {
    setTipsData(prev => ({ ...prev, [tokenId]: tips }));
  };

    // Initialize Moralis once when the component mounts
    useEffect(() => {
      const initializeMoralis = async () => {
        try {
          await Moralis.start({
            apiKey: moralisApiKey
          });
          setMoralisInitialized(true);
          console.log("Moralis initialized");
        } catch (error) {
          console.error("Moralis initialization failed:", error);
        }
      };
  
      initializeMoralis();
    }, []);
  
    // Fetch items after Moralis has been initialized
    useEffect(() => {
      if (moralisInitialized) {
        fetchAllItems();
      }
    }, [moralisInitialized]);

    const fetchAllItems = async () => {
      if (loading) return;
      setLoading(true);
      let allFetchedTokens = [];
      let cursor = null;
    
      try {
        while (true) {
          console.log("Fetching page with cursor:", cursor); // Debugging line
    
          const url = new URL(`https://deep-index.moralis.io/api/v2.2/nft/0x568863597b44AA509a45C15eE3Cab3150a562d32`);
          const params = {
            chain: "avalanche",
            format: "decimal",
            limit: 100,
            cursor: cursor,
          };
          Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              "X-API-Key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjUzNzNiZmVlLTMxODctNGVlMi1hNTJjLWQzNmFmYzQ1OTAzMiIsIm9yZ0lkIjoiMjQ4NzU1IiwidXNlcklkIjoiMjUxOTk2IiwidHlwZUlkIjoiZDc0ZjE3OWQtNjYxMC00N2JmLWJjYzctYjJjZWIyNmZmY2VmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjczMTM0NzEsImV4cCI6NDg4MzA3MzQ3MX0.eT8VsglTQqOnENcgO2TD_jfMH0GLFVrkvVUBLrdzmek", // Replace with your actual API key
            },
          };
    
          const response = await fetch(url, options);
          const data = await response.json();
    
          if (response.ok && data && Array.isArray(data.result)) {
            console.log(`Fetched ${data.result.length} tokens`); // Debugging line
            allFetchedTokens = [...allFetchedTokens, ...data.result];
    
            if (data.cursor) {
              cursor = data.cursor;
            } else {
              console.log("No more pages to fetch."); // Debugging line
              break; // No more pages
            }
          } else {
            throw new Error(data.message || "Error fetching data");
          }
        }
    
        console.log("Total tokens fetched:", allFetchedTokens.length); // Debugging line
    
        setAllTokens(allFetchedTokens);
        // Call your filter and sort function if you have one
        filterAndSortTokens(allFetchedTokens);
    
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      fetchAllItems();
      
    }, []);
    

    useEffect(() => {
      filterAndSortTokens(allTokens);
    }, [allTokens, recipeNameSearch, searchText1, searchText2, searchText3, mealType, community, contributorSearch, sortOption]);
    
  

  const filterAndSortTokens = (tokens) => {
    console.log("Tokens before filtering:", tokens.length); // Debugging line
  
    // Parse metadata and filter tokens
    let filteredTokens = tokens.map(token => {
      let parsedMetadata = {};
  
      // Check and parse metadata
      if (token.metadata) {
        if (typeof token.metadata === 'string') {
          try {
            parsedMetadata = JSON.parse(token.metadata);
          } catch (error) {
            console.error("Error parsing token.metadata:", error);
            parsedMetadata = {};
          }
        } else {
          parsedMetadata = token.metadata;
        }
      }
  
      return {
        ...token,
        parsedMetadata,
        tokenId: Number(token.token_id) // Convert tokenId to number
    };
    }).filter(token => {
      // Check if parsedMetadata and attributes exist
      if (!token.parsedMetadata || !token.parsedMetadata.attributes) {
        console.log("Token excluded due to missing metadata/attributes:", token);
        return false;
      }
      return true;
    });
  
    console.log("Tokens after parsing and initial filtering:", filteredTokens.length); // Debugging line
  
    // Meal type filtering
    if (mealType !== 'all') {
      filteredTokens = filteredTokens.filter(token => {
        const attributes = token.parsedMetadata.attributes;
        return attributes.some(attr => attr.trait_type === "Category" && attr.value === mealType);
      });
    }
  
    // Community filtering
    if (community !== 'All Communities') {
      filteredTokens = filteredTokens.filter(token => {
        const attributes = token.parsedMetadata.attributes;
        return attributes.some(attr => attr.trait_type === "Community Tag" && attr.value === community);
      });
    }
  
    // Search text filtering
    const searchTerms = [searchText1, searchText2, searchText3].filter(text => text.trim() !== '');
    if (searchTerms.length > 0) {
      filteredTokens = filteredTokens.filter(token => {
        const attributes = token.parsedMetadata.attributes;
        return searchTerms.every(term =>
          attributes.some(attr => attr.value.toLowerCase().includes(term.toLowerCase()))
        );
      });
    }
  
    // Recipe name search filtering
    if (recipeNameSearch.trim() !== '') {
      filteredTokens = filteredTokens.filter(token => {
        const name = token.parsedMetadata.name || '';
        return name.toLowerCase().includes(recipeNameSearch.toLowerCase());
      });
    }
  
    // Contributor search filtering
    if (contributorSearch.trim() !== '') {
      filteredTokens = filteredTokens.filter(token => {
        const attributes = token.parsedMetadata.attributes;
        return attributes.some(attr => attr.trait_type === "Contributor" && attr.value.toLowerCase().includes(contributorSearch.toLowerCase()));
      });
    }
  
    console.log("Tokens after all filtering:", filteredTokens.length); // Debugging line
  
    // Sorting
    switch (sortOption) {
      case 'likesDesc':
          filteredTokens.sort((a, b) => b.likes - a.likes);
          break;
      case 'tipsDesc':
          filteredTokens.sort((a, b) => {
              const tipsA = Object.values(tipsData[a.tokenId] || {}).reduce((acc, val) => acc + parseFloat(val), 0);
              const tipsB = Object.values(tipsData[b.tokenId] || {}).reduce((acc, val) => acc + parseFloat(val), 0);
              return tipsB - tipsA;
          });
          break;
      case 'newest':
          filteredTokens.sort((a, b) => b.tokenId - a.tokenId); // Newest to Oldest
          break;
      case 'oldest':
          filteredTokens.sort((a, b) => a.tokenId - b.tokenId); // Oldest to Newest
          break;
      case 'random':
      default:
          filteredTokens = shuffleArray(filteredTokens);
          break;
  }
    // Set the display tokens
    setDisplayTokens(filteredTokens);
    console.log("Display tokens set:", filteredTokens.length); // Debugging line
  };
  


  const handleCulinaryStarsToggle = () => {
    if (isCulinaryStarsMode || contributorSearch !== '') {
        // If in culinary stars mode or a specific contributor is selected, reset to the original view
        setIsCulinaryStarsMode(false);
        setContributorSearch('');
    } else {
        // If not in culinary stars mode, switch to it
        setIsCulinaryStarsMode(true);
    }
};


  const handleUserProfileClick = (username) => {
    setContributorSearch(username);
    setIsCulinaryStarsMode(false); // Switch back to recipe cards view
  };
  
  
  

  const renderCards = () => {
    console.log("Rendering tokens:", displayTokens.length); // Debugging line

    if (isCulinaryStarsMode) {
        return (
            <div className="flex flex-wrap justify-center z-10 opacity-95 col-span-3">
                {userProfiles.map((profile, index) => (
                    <UserProfileCard
                        key={index}
                        profile={profile}
                        onClick={() => handleUserProfileClick(profile.username)}
                    />
                ))}
            </div>
        );
    } else {
        return (
            <div className="relative flex flex-wrap justify-center z-10 opacity-95 col-span-3">
                {displayTokens.map((token, index) => (
                    <NFTCard
                        key={index}
                        token={token}
                        account={account}
                        showBookmarks={showBookmarks}
                        onTipsFetch={handleTipsFetch}
                        expanded={expandedTokenId === token.token_id}
                        viewMode={viewMode}
                        imageMapping={imageMapping}
                    />
                ))}
            </div>
        );
    }
};


  return (
    <div className="container mx-auto p-4 pt-0 md:pt-4">
      <div className="mx-auto w-64 h-64 pt-6 pointer-events-none block md:hidden pb-8">
        <img src={logothin} alt="Logo" />
      </div>
      <h1 className="text-6xl pb-8 pt-12 font-bold mb-4 text-neutral-800">Browse {displayTokens.length} Recipes</h1>
      <div className="py-0 md:pb-0 md:py-0 lg:px-32 xl:px-48 mx-auto 2xl:px-32">
      <div className="py-0 md:pb-0 md:py-0 lg:px-32 xl:px-48 mx-auto 2xl:px-32">
        {/* Search Inputs */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-2 md:space-y-0 mt-2 pb-2">
          <div className="flex-1 w-full md:pr-2">
            <input
              type="text"
              value={recipeNameSearch}
              onChange={(e) => setRecipeNameSearch(e.target.value)}
              placeholder="Search recipe name..."
              className="text-gray-200 bg-neutral-700 shadow-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="flex-1 w-full md:pr-2 md:pl-2">
            <input
              type="text"
              value={searchText1}
              onChange={(e) => setSearchText1(e.target.value)}
              placeholder="Search ingredient 1..."
              className="text-gray-200 bg-neutral-700 shadow-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="flex-1 w-full md:px-2">
            <input
              type="text"
              value={searchText2}
              onChange={(e) => setSearchText2(e.target.value)}
              placeholder="Search ingredient 2..."
              className="text-gray-200 bg-neutral-700 shadow-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="flex-1 w-full md:pl-2">
            <input
              type="text"
              value={searchText3}
              onChange={(e) => setSearchText3(e.target.value)}
              placeholder="Search ingredient 3..."
              className="text-gray-200 bg-neutral-700 shadow-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-2 md:space-y-0 md:mt-2 pb-20 xl:px-48 lg:px-32 2xl:px-32">
          <div className="flex-1 w-full md:pr-4">
            <input
              type="text"
              value={contributorSearch}
              onChange={(e) => setContributorSearch(e.target.value)}
              placeholder="Search by contributor..."
              className="text-gray-200 bg-neutral-700 shadow-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="flex-1 w-full md:pr-2">
            <select
              className="bg-neutral-700 border-neutral-800 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Dressings">Dressings</option>
              <option value="Lunch">Lunch</option>
              <option value="Sauces">Sauces</option>
              <option value="Snacks">Snacks</option>
              <option value="Dinner">Dinner</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Marinades">Marinades</option>
              <option value="Garnishes">Garnishes</option>
              <option value="Desserts">Desserts</option>
              <option value="Baked Goods">Baked Goods</option>
              <option value="Drinks">Drinks</option>
              <option value="Cleaners">Cleaners</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-1 w-full md:px-2">
            <select
              className="bg-neutral-700 border-neutral-800 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
          <div className="flex-1 w-full md:pl-2">
            <select
              className="bg-neutral-700 border-neutral-800 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="random">Random Order</option>
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
              {/*<option value="likesDesc">Most Likes First</option>
              <option value="tipsDesc">Most Tipped First</option>*/}
            </select>
          </div>
        </div> 
        
      </div>
        {/* (Search Input Elements) */}
      </div>
      <div className="mt-4">
      {/*<div className="px-2 md:px-2 lg:px-32 xl:px-48 2xl:px-32 pb-12">
      <button
  onClick={handleCulinaryStarsToggle}
  className="bg-neutral-700 text-white rounded-xl px-16 py-8 w-full text-4xl tracking-widest font-bold hover:bg-teal-500 duration-300"
>
  {isCulinaryStarsMode || contributorSearch ? (
    "Back"
  ) : (
    <>
   
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 inline-block mr-2 pb-2">
        <path d="M12 2.25l2.474 7.617h8.005l-6.482 4.712 2.474 7.617L12 17.484l-6.471 4.712 2.474-7.617L1.518 9.867h8.005L12 2.25z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 inline-block mr-2 pb-2">
        <path d="M12 2.25l2.474 7.617h8.005l-6.482 4.712 2.474 7.617L12 17.484l-6.471 4.712 2.474-7.617L1.518 9.867h8.005L12 2.25z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 inline-block mr-2 pb-2">
        <path d="M12 2.25l2.474 7.617h8.005l-6.482 4.712 2.474 7.617L12 17.484l-6.471 4.712 2.474-7.617L1.518 9.867h8.005L12 2.25z"/>
      </svg>
      Culinary Stars
   
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 inline-block mr-2 pb-2">
        <path d="M12 2.25l2.474 7.617h8.005l-6.482 4.712 2.474 7.617L12 17.484l-6.471 4.712 2.474-7.617L1.518 9.867h8.005L12 2.25z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 inline-block mr-2 pb-2">
        <path d="M12 2.25l2.474 7.617h8.005l-6.482 4.712 2.474 7.617L12 17.484l-6.471 4.712 2.474-7.617L1.518 9.867h8.005L12 2.25z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 inline-block mr-2 pb-2">
        <path d="M12 2.25l2.474 7.617h8.005l-6.482 4.712 2.474 7.617L12 17.484l-6.471 4.712 2.474-7.617L1.518 9.867h8.005L12 2.25z"/>
      </svg>
    </>
  )}
</button>

</div>*/}

        {renderCards()}
      </div>
      {loading && <p>Loading...</p>}
      <div className="fixed bottom-5 left-10 w-96 h-96 pointer-events-none z-0 hidden md:block opacity-100">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Gallery;
