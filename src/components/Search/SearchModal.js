import React, { useContext, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { StoreContext } from "../../context/store-settings-context";
import { TailSpin } from "react-loader-spinner";

const SearchModal = ({ searchModal, setSearchModal }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sugg_length, setsugg_length] = useState(false);
  const [products, setProducts] = useState([]);
  const { storeSettings } = useContext(StoreContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [metaInfo, setMetaInfo] = useState({});
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (search) {
      setPageNumber(1);
      setProducts([]);
      setHasMore(true);
      getProductsCall(1);
    }
  }, [search]);

  useEffect(() => {
    if (pageNumber > 1) {
      getProductsCall(pageNumber);
    }
  }, [pageNumber]);

  const getProductsCall = async (page) => {
    try {
      let response;
      if (search) {
        response = await axios.get(
          `${BASE_URL}/products/v1/search?query=${search}&page=${page}`
        );
      }
      const { data, meta } = response.data;

      setMetaInfo(meta);

      if (page === 1) {
        setProducts(data);
      } else {
        setProducts((prevData) => [...prevData, ...data]);
      }

      if (meta.current_page >= meta.total_pages) {
        setHasMore(false);
      }

      if (meta.next_page === -1) {
        setPageNumber(meta.current_page);
      } else {
        setPageNumber(meta.current_page + 1);
      }
    } catch (error) {
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  const onSearchChange = (text) => {
    setSearch(text);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setPageNumber(1);
      setProducts([]);
      setHasMore(true);
      if (search.length >= 2) {
        getProductsCall();
      }
    }
  };

  const linkClick = () => {
    setSearchModal(false);
    setSearch("");
    setProducts([]);
    setsugg_length(false);
  };

  return (
    <>
      <Modal
        show={searchModal}
        onHide={() => {
          setSearchModal(false);
          setSearch("");
          setProducts([]);
          setsugg_length(false);
        }}
        className="searching_modal"
      >
        <div
          className="close-icon"
          onClick={() => {
            setSearchModal(false);
            setSearch("");
            setProducts([]);
            setsugg_length(false);
          }}
        >
          <MdOutlineClose className="theme_icon_color" />
        </div>

        <Modal.Body>
          <div className="search_wrapper">
            <form className="d-flex align-items-center">
              <AiOutlineSearch />
              <input
                type="text"
                className="search_input"
                placeholder="Search..."
                name="search"
                value={search}
                style={{ marginLeft: "2%" }}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyPress}
                autoComplete="off"
              />
            </form>
          </div>
        </Modal.Body>
        <div className={`suggestion ${products.length > 3 ? "sugg_height" : "sugg"}`}>
          {products.length > 0 ? (
            <>
              <InfiniteScroll
                dataLength={products.length}
                next={() => setPageNumber(metaInfo.next_page)}
                hasMore={hasMore}
                loader={<TailSpin color="#000000" height={60} width={60} />}
                className="row-product"
                scrollThreshold={0.35} // Adjust this value as needed (e.g., 0.9 means 90% scroll height)
              >
                {products.map((sugg) => (
                  <div key={sugg?.id} className="inner_suggestion">
                    <Link
                      to={sugg?.id ? `/product/${sugg?.name}/${sugg?.id}` : "#"}
                      className="text-decoration-none text-dark"
                      onClick={linkClick}
                    >
                      <div>
                        <img
                          src={
                            sugg?.image?.thumbnail
                              ? sugg?.image?.thumbnail
                              : "/images/image-not-found.jpg"
                          }
                          alt={sugg.name}
                        />
                      </div>
                    </Link>
                    <Link
                      to={sugg?.id ? `/product/${sugg?.name}/${sugg?.id}` : "#"}
                      className="text-decoration-none text-dark"
                      onClick={linkClick}
                    >
                      <div className="suggestion_content">
                        <p>{sugg?.name}</p>
                        <span>
                          {storeSettings.currency_code} {sugg?.price_with_tax}
                        </span>
                        {sugg?.compare_price && (
                          <span>
                            <del style={{ color: "dimgray" }}>
                              {storeSettings.currency_code}{" "}
                              {sugg?.compare_price}
                            </del>
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </InfiniteScroll>
            </>
          ) : (
            // <div className="not_found">No products found</div>
            null
          )}
        </div>
      </Modal>
    </>
  );
};

export default SearchModal;
