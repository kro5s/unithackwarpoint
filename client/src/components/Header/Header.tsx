import React from 'react';
import Account from "./Account";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/hooks";
import {selectAllCartItems} from "../../store/slices/cartSlice";

const Header = () => {
    const cartItems = useAppSelector(selectAllCartItems)

    const cartItemsAmount = cartItems.reduce((acc, item) => acc += item.quantity, 0)
    
    return (
        <header className="pt-8">
            <div className="flex items-center justify-between px-10">
                <Link to="/">
                    <svg className="" width="302" height="61" viewBox="0 0 302 61" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M100.819 23.5448C99.1821 25.4301 98.3635 28.4717 98.3635 32.6697C98.3635 36.8426 99.1821 39.9219 100.819 41.9078C102.481 43.8937 105.172 44.8866 108.892 44.8866C112.638 44.8866 115.341 43.8811 117.003 41.8701C118.69 39.859 119.532 36.7671 119.532 32.5943C119.532 28.3963 118.715 25.3673 117.077 23.5071C115.465 21.6469 112.762 20.7168 108.967 20.7168C105.197 20.7168 102.481 21.6595 100.819 23.5448ZM108.967 27.2023C110.033 27.2023 110.728 27.5291 111.05 28.1827C111.373 28.8111 111.534 30.156 111.534 32.2173V33.9518C111.534 36.0382 111.397 37.383 111.125 37.9863C110.852 38.5896 110.17 38.8913 109.078 38.8913C107.987 38.8913 107.28 38.5771 106.958 37.9487C106.635 37.3201 106.474 35.9502 106.474 33.8386V32.1796C106.474 30.1183 106.623 28.7734 106.921 28.145C107.218 27.5165 107.9 27.2023 108.967 27.2023ZM34.6298 21.0939L29.8698 44.5095H21.0151L19.1178 35.0075L17.4808 44.5095H8.62612L5.12589 28.6543L8.87256 27.2403H5.06761H1.26267L0 21.104L10.7489 21.0939L12.9987 31.8402L15.7322 21.0939H22.7638L25.6089 31.8402L27.5982 21.0939H34.6298ZM53.6512 44.5095H45.8382L45.0941 40.8897H40.9645L40.1832 44.5095H32.7051L37.5044 21.0939H48.8518L53.6512 44.5095ZM44.5361 36.0255L43.0479 28.1827L41.5226 36.0255H44.5361ZM73.343 32.255C73.8391 31.35 74.0871 30.1434 74.0871 28.6351C74.0871 26.046 73.4051 24.1481 72.0409 22.9415C70.6768 21.7097 68.5561 21.0939 65.679 21.0939L52.0393 21.104L53.302 27.2403H59.99L55.8198 28.6532V44.5095H63.4468V36.4404H64.042L66.3487 44.5095H74.5708L71.1108 34.5928C72.1278 33.914 72.8718 33.1348 73.343 32.255ZM65.4185 31.35C65.1953 31.6768 64.7985 31.8402 64.228 31.8402H63.2979V27.2777H64.2652C64.7861 27.2777 65.1705 27.4411 65.4185 27.7679C65.6666 28.0947 65.7905 28.6854 65.7905 29.5401C65.7905 30.3948 65.6666 30.9981 65.4185 31.35ZM88.5008 37.1945H86.901V44.5095H79.0881V28.6351L83.3813 27.2403H76.6933L75.4306 21.104L88.0916 21.0939C88.3149 21.0939 88.5338 21.0972 88.7481 21.104H88.9127L88.9143 21.1099C91.5446 21.2151 93.4903 21.8382 94.7512 22.9792C96.1401 24.2361 96.8346 26.3099 96.8346 29.2007C96.8346 32.0916 96.1649 34.1528 94.8256 35.3846C93.4863 36.5912 91.378 37.1945 88.5008 37.1945ZM86.7522 27.2637H88.4585C88.6192 27.3608 88.7448 27.4911 88.8357 27.6548C89.0837 28.057 89.2077 28.7357 89.2077 29.6909C89.2077 30.6462 89.0961 31.3249 88.8729 31.7271C88.6745 32.1293 88.29 32.3304 87.7196 32.3304H86.7522V27.2637ZM129.734 44.5095H121.884V21.0939H129.734V27.4632H123.72L129.734 29.2007V44.5095ZM145.414 44.5095H153.694V28.6532L149.082 27.4632L159.206 27.4662V44.5095H167.13V27.4662H172.502L175.023 21.0939H145.86V30.6336L141.246 21.0939H132.705V44.5095H140.465V35.2715L145.414 44.5095Z"
                              fill="white"/>
                        <path
                            d="M189.24 29.844C189.504 29.34 189.768 28.896 190.032 28.512C190.296 28.104 190.572 27.708 190.86 27.324C191.172 26.916 191.52 26.46 191.904 25.956H192.876C192.804 26.436 192.744 27.06 192.696 27.828C192.648 28.572 192.612 29.568 192.588 30.816C192.564 32.064 192.552 33.672 192.552 35.64C192.552 37.584 192.552 39.996 192.552 42.876L195.648 43.416L194.964 44.748C194.724 44.772 194.364 44.82 193.884 44.892C193.404 44.964 192.912 45.024 192.408 45.072C191.904 45.144 191.46 45.204 191.076 45.252C190.716 45.3 190.5 45.324 190.428 45.324C190.356 45.324 190.224 45.24 190.032 45.072C189.84 44.904 189.648 44.724 189.456 44.532C189.288 44.34 189.204 44.208 189.204 44.136C189.252 43.2 189.312 42.3 189.384 41.436C189.48 40.548 189.528 39.444 189.528 38.124C189.528 37.116 189.492 36.132 189.42 35.172C189.348 34.188 189.288 33.252 189.24 32.364C189.192 31.452 189.192 30.612 189.24 29.844ZM194.712 34.452L201.624 34.236V36.144L194.712 35.928V34.452ZM196.404 26.1V41.364C196.404 41.508 196.344 41.772 196.224 42.156C196.104 42.516 195.912 42.936 195.648 43.416H194.532V26.1H196.404ZM187.728 25.344L187.98 22.68C189.3 22.776 190.716 22.908 192.228 23.076C193.764 23.22 195.252 23.388 196.692 23.58C198.156 23.748 199.44 23.916 200.544 24.084C201.648 24.252 202.44 24.408 202.92 24.552C202.968 24.576 203.052 24.648 203.172 24.768C203.316 24.864 203.448 24.984 203.568 25.128C203.712 25.248 203.832 25.38 203.928 25.524C204.024 25.644 204.072 25.728 204.072 25.776V42.84L206.304 43.38V44.784C206.016 44.832 205.644 44.892 205.188 44.964C204.732 45.012 204.264 45.06 203.784 45.108C203.304 45.18 202.884 45.228 202.524 45.252C202.164 45.3 201.948 45.324 201.876 45.324C201.804 45.324 201.672 45.228 201.48 45.036C201.288 44.868 201.108 44.688 200.94 44.496C200.796 44.304 200.724 44.172 200.724 44.1V27.396L192.696 26.46L191.508 26.532L191.436 26.316L187.728 25.344ZM211.083 45.324C211.011 45.324 210.879 45.24 210.687 45.072C210.495 44.904 210.303 44.724 210.111 44.532C209.943 44.34 209.859 44.208 209.859 44.136V30.888L208.599 30.456V29.124C208.599 29.124 208.731 29.1 208.995 29.052C209.283 28.98 209.619 28.908 210.003 28.836C210.387 28.764 210.735 28.704 211.047 28.656C211.383 28.584 211.587 28.548 211.659 28.548C211.731 28.548 211.887 28.644 212.127 28.836C212.367 29.028 212.583 29.232 212.775 29.448C212.991 29.664 213.099 29.808 213.099 29.88L213.027 31.284C213.363 30.948 213.675 30.624 213.963 30.312C214.275 29.976 214.563 29.676 214.827 29.412C215.091 29.148 215.307 28.944 215.475 28.8C215.667 28.632 215.787 28.548 215.835 28.548C216.099 28.548 216.495 28.62 217.023 28.764C217.551 28.908 217.959 29.028 218.247 29.124C218.295 29.268 218.343 29.46 218.391 29.7C218.439 29.94 218.463 30.12 218.463 30.24C218.463 30.312 218.415 30.444 218.319 30.636C218.247 30.828 218.151 31.032 218.031 31.248C217.935 31.464 217.827 31.656 217.707 31.824C217.611 31.992 217.539 32.088 217.491 32.112C217.323 32.04 217.131 31.968 216.915 31.896C216.699 31.824 216.471 31.764 216.231 31.716C216.015 31.668 215.799 31.644 215.583 31.644C215.511 31.644 215.391 31.68 215.223 31.752C215.055 31.8 214.863 31.884 214.647 32.004C214.431 32.1 214.191 32.22 213.927 32.364C213.687 32.484 213.423 32.628 213.135 32.796V42.732L214.971 43.272V44.748C214.971 44.748 214.851 44.772 214.611 44.82C214.371 44.844 214.071 44.892 213.711 44.964C213.351 45.012 212.979 45.06 212.595 45.108C212.211 45.18 211.875 45.228 211.587 45.252C211.323 45.3 211.155 45.324 211.083 45.324ZM226.44 45.324C226.2 45.324 225.816 45.312 225.288 45.288C224.76 45.264 224.16 45.228 223.488 45.18C222.816 45.132 222.168 45.072 221.544 45C220.92 44.952 220.392 44.904 219.96 44.856L220.032 39.672L221.832 39.636L222.588 42.372C222.972 42.492 223.404 42.612 223.884 42.732C224.364 42.852 224.82 42.948 225.252 43.02C225.684 43.092 226.008 43.128 226.224 43.128C226.368 43.128 226.524 43.02 226.692 42.804C226.86 42.588 227.004 42.324 227.124 42.012C227.268 41.676 227.34 41.376 227.34 41.112C227.34 40.656 227.232 40.284 227.016 39.996C226.8 39.684 226.44 39.372 225.936 39.06C225.432 38.748 224.748 38.364 223.884 37.908C222.948 37.38 222.192 36.912 221.616 36.504C221.064 36.072 220.656 35.616 220.392 35.136C220.152 34.656 220.032 34.104 220.032 33.48C220.032 33.168 220.044 32.856 220.068 32.544C220.092 32.208 220.14 31.932 220.212 31.716C220.404 31.428 220.668 31.104 221.004 30.744C221.364 30.36 221.736 30.012 222.12 29.7C222.528 29.364 222.9 29.088 223.236 28.872C223.596 28.656 223.872 28.548 224.064 28.548C224.352 28.548 224.748 28.56 225.252 28.584C225.78 28.608 226.344 28.632 226.944 28.656C227.544 28.68 228.12 28.716 228.672 28.764C229.224 28.788 229.68 28.824 230.04 28.872L229.932 33.264H227.916L227.664 31.356C227.568 31.308 227.34 31.26 226.98 31.212C226.62 31.14 226.212 31.08 225.756 31.032C225.324 30.96 224.916 30.9 224.532 30.852C224.172 30.804 223.932 30.78 223.812 30.78C223.668 30.78 223.536 30.828 223.416 30.924C223.296 31.02 223.2 31.176 223.128 31.392C223.056 31.608 223.02 31.908 223.02 32.292C223.02 32.748 223.152 33.144 223.416 33.48C223.68 33.792 224.004 34.068 224.388 34.308C224.796 34.548 225.204 34.8 225.612 35.064C226.044 35.328 226.548 35.628 227.124 35.964C227.724 36.3 228.3 36.66 228.852 37.044C229.428 37.428 229.896 37.86 230.256 38.34C230.616 38.796 230.796 39.3 230.796 39.852C230.796 40.092 230.784 40.368 230.76 40.68C230.736 40.992 230.664 41.328 230.544 41.688C230.376 42 230.124 42.36 229.788 42.768C229.452 43.176 229.08 43.584 228.672 43.992C228.264 44.376 227.856 44.7 227.448 44.964C227.064 45.204 226.728 45.324 226.44 45.324ZM236.422 37.116C236.422 38.676 236.626 39.864 237.034 40.68C237.466 41.496 237.946 42.048 238.474 42.336C239.002 42.624 239.434 42.768 239.77 42.768C239.866 42.768 240.094 42.768 240.454 42.768C240.814 42.744 241.234 42.72 241.714 42.696C242.194 42.672 242.674 42.648 243.154 42.624C243.634 42.6 244.054 42.588 244.414 42.588V44.064C243.982 44.208 243.49 44.352 242.938 44.496C242.386 44.64 241.834 44.772 241.282 44.892C240.73 45.012 240.238 45.108 239.806 45.18C239.398 45.276 239.11 45.324 238.942 45.324C237.958 45.324 237.01 45.06 236.098 44.532C235.186 43.98 234.43 43.152 233.83 42.048C233.254 40.92 232.966 39.492 232.966 37.764C232.966 36.564 233.05 35.46 233.218 34.452C233.386 33.444 233.59 32.712 233.83 32.256C234.022 31.968 234.358 31.62 234.838 31.212C235.342 30.78 235.882 30.372 236.458 29.988C237.058 29.58 237.61 29.244 238.114 28.98C238.618 28.692 238.99 28.548 239.23 28.548C240.55 28.548 241.618 28.764 242.434 29.196C243.274 29.628 243.898 30.444 244.306 31.644C244.714 32.82 244.918 34.56 244.918 36.864L234.838 37.908V36.54L241.426 35.46C241.426 33.996 241.27 32.844 240.958 32.004C240.646 31.14 239.974 30.708 238.942 30.708C238.75 30.708 238.534 30.72 238.294 30.744C238.078 30.768 237.838 30.84 237.574 30.96C237.238 31.128 236.962 31.776 236.746 32.904C236.53 34.008 236.422 35.412 236.422 37.116ZM249.896 45.324C249.824 45.324 249.692 45.24 249.5 45.072C249.308 44.904 249.116 44.724 248.924 44.532C248.756 44.34 248.672 44.208 248.672 44.136V30.996L247.412 30.456V29.124C247.412 29.124 247.556 29.1 247.844 29.052C248.156 28.98 248.516 28.92 248.924 28.872C249.332 28.8 249.704 28.74 250.04 28.692C250.4 28.62 250.616 28.584 250.688 28.584C250.76 28.584 250.892 28.668 251.084 28.836C251.276 28.98 251.444 29.148 251.588 29.34C251.756 29.532 251.84 29.664 251.84 29.736V31.104C252.152 30.864 252.5 30.6 252.884 30.312C253.292 30.024 253.688 29.748 254.072 29.484C254.456 29.22 254.78 29.004 255.044 28.836C255.332 28.644 255.5 28.548 255.548 28.548C256.628 28.548 257.552 28.728 258.32 29.088C259.088 29.448 259.676 30.072 260.084 30.96C260.516 31.848 260.732 33.072 260.732 34.632V42.876L261.992 43.416V44.748C261.992 44.748 261.836 44.784 261.524 44.856C261.236 44.904 260.876 44.964 260.444 45.036C260.036 45.108 259.664 45.168 259.328 45.216C258.992 45.288 258.788 45.324 258.716 45.324C258.644 45.324 258.5 45.24 258.284 45.072C258.092 44.904 257.9 44.724 257.708 44.532C257.54 44.34 257.456 44.208 257.456 44.136V34.632C257.456 33.48 257.312 32.676 257.024 32.22C256.76 31.74 256.46 31.464 256.124 31.392C255.788 31.296 255.536 31.248 255.368 31.248C255.224 31.248 254.96 31.32 254.576 31.464C254.216 31.608 253.796 31.788 253.316 32.004C252.86 32.196 252.404 32.4 251.948 32.616V42.876L253.172 43.416V44.748C253.172 44.748 253.016 44.784 252.704 44.856C252.416 44.904 252.068 44.964 251.66 45.036C251.252 45.108 250.868 45.168 250.508 45.216C250.172 45.288 249.968 45.324 249.896 45.324ZM269.322 45.324C268.218 45.324 267.294 45.132 266.55 44.748C265.83 44.34 265.29 43.788 264.93 43.092C264.57 42.396 264.39 41.604 264.39 40.716C264.39 40.164 264.45 39.576 264.57 38.952C264.714 38.328 264.966 37.752 265.326 37.224L267.846 38.52C267.774 38.76 267.714 39.06 267.666 39.42C267.618 39.756 267.594 40.104 267.594 40.464C267.594 41.16 267.714 41.7 267.954 42.084C268.194 42.468 268.722 42.66 269.538 42.66C269.658 42.66 269.922 42.576 270.33 42.408C270.738 42.216 271.218 41.988 271.77 41.724C272.346 41.436 272.91 41.16 273.462 40.896V42.372C272.886 42.804 272.286 43.248 271.662 43.704C271.062 44.16 270.546 44.544 270.114 44.856C269.682 45.168 269.418 45.324 269.322 45.324ZM265.326 37.224L273.102 36.072V37.656L267.414 38.844L265.326 37.224ZM265.578 30.852L266.082 28.656C266.946 28.608 267.714 28.584 268.386 28.584C269.058 28.56 269.694 28.56 270.294 28.584C270.894 28.584 271.506 28.608 272.13 28.656C272.49 28.68 272.886 28.86 273.318 29.196C273.774 29.508 274.206 29.904 274.614 30.384C275.046 30.84 275.394 31.32 275.658 31.824C275.946 32.304 276.09 32.724 276.09 33.084V42.876L277.35 43.416V44.748C276.87 44.844 276.39 44.928 275.91 45C275.454 45.096 275.058 45.168 274.722 45.216C274.386 45.288 274.17 45.324 274.074 45.324C274.002 45.324 273.87 45.24 273.678 45.072C273.486 44.928 273.306 44.76 273.138 44.568C272.994 44.376 272.922 44.232 272.922 44.136V42.372L272.814 41.94V33.804C272.814 33.012 272.658 32.424 272.346 32.04C272.058 31.656 271.602 31.44 270.978 31.392C270.738 31.368 270.342 31.356 269.79 31.356C269.238 31.356 268.626 31.368 267.954 31.392C267.282 31.392 266.646 31.404 266.046 31.428L265.578 30.852ZM281.888 45.324C281.816 45.324 281.684 45.24 281.492 45.072C281.3 44.904 281.12 44.724 280.952 44.532C280.784 44.34 280.7 44.208 280.7 44.136V24.156L279.404 23.652V22.32C279.404 22.32 279.5 22.308 279.692 22.284C279.908 22.236 280.172 22.188 280.484 22.14C280.796 22.068 281.108 22.008 281.42 21.96C281.756 21.888 282.044 21.84 282.284 21.816C282.524 21.768 282.68 21.744 282.752 21.744C282.824 21.744 282.956 21.828 283.148 21.996C283.34 22.164 283.52 22.344 283.688 22.536C283.856 22.704 283.94 22.836 283.94 22.932V42.876L285.164 43.416V44.748C285.164 44.748 285.008 44.784 284.696 44.856C284.408 44.904 284.06 44.964 283.652 45.036C283.244 45.108 282.86 45.168 282.5 45.216C282.164 45.288 281.96 45.324 281.888 45.324Z"
                            fill="#E61B1B"/>
                    </svg>
                </Link>
                <div className="flex items-center gap-x-10">
                    <Link to="/game">
                        <div>
                            <svg width="21" height="24" viewBox="0 0 21 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.68919 24V14.6L0 8.57143L5.25 0H15.75L21 8.57143L17.3108 14.6V24L10.5 21.7143L3.68919 24ZM5.95946 20.8286L10.5 19.3143L15.0405 20.8286V17.1429H5.95946V20.8286ZM6.52703 2.28571L2.66757 8.57143L6.52703 14.8571H14.473L18.3324 8.57143L14.473 2.28571H6.52703ZM9.30811 13.2286L5.27838 9.2L6.89595 7.57143L9.30811 10L14.1041 5.14286L15.7216 6.74286L9.30811 13.2286Z"
                                    fill="white"/>
                            </svg>
                        </div>
                    </Link>
                    <Link to="/cart">
                        <div className="relative">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.20666 24C6.54605 24 5.98053 23.765 5.51009 23.295C5.03966 22.825 4.80444 22.26 4.80444 21.6C4.80444 20.94 5.03966 20.375 5.51009 19.905C5.98053 19.435 6.54605 19.2 7.20666 19.2C7.86727 19.2 8.43279 19.435 8.90323 19.905C9.37366 20.375 9.60888 20.94 9.60888 21.6C9.60888 22.26 9.37366 22.825 8.90323 23.295C8.43279 23.765 7.86727 24 7.20666 24ZM19.2178 24C18.5571 24 17.9916 23.765 17.5212 23.295C17.0508 22.825 16.8155 22.26 16.8155 21.6C16.8155 20.94 17.0508 20.375 17.5212 19.905C17.9916 19.435 18.5571 19.2 19.2178 19.2C19.8784 19.2 20.4439 19.435 20.9143 19.905C21.3848 20.375 21.62 20.94 21.62 21.6C21.62 22.26 21.3848 22.825 20.9143 23.295C20.4439 23.765 19.8784 24 19.2178 24ZM6.18572 4.8L9.06838 10.8H17.4761L20.7792 4.8H6.18572ZM5.04466 2.4H22.761C23.2215 2.4 23.5718 2.605 23.812 3.015C24.0522 3.425 24.0622 3.84 23.842 4.26L19.5781 11.94C19.3579 12.34 19.0626 12.65 18.6923 12.87C18.3219 13.09 17.9166 13.2 17.4761 13.2H8.52788L7.20666 15.6H21.62V18H7.20666C6.30583 18 5.6252 17.605 5.16477 16.815C4.70435 16.025 4.68433 15.24 5.10472 14.46L6.72621 11.52L2.40222 2.4H0V0H3.90361L5.04466 2.4Z"
                                    fill="white"/>
                            </svg>
                            {
                                cartItems.length > 0 &&
                                <div className="absolute -right-2 -top-4 bg-blue-accent px-[8px] rounded-full"><span className="text-xs font-bold">{cartItemsAmount}</span></div>
                            }
                        </div>
                    </Link>
                    <Account/>
                </div>
            </div>
        </header>
    );
};

export default Header;