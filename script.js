const KEY = {
    cart: "quickbite_cart",
    fav: "quickbite_favorites",
    orders: "quickbite_orders",
    theme: "quickbite_theme"
};


// =========================
// FOOD DATA
// =========================

const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        cat: "Pizza",
        price: 299,
        rating: 4.8,
        emoji: "🍕",
        desc: "Classic tomato, mozzarella and basil."
    },

    {
        id: 2,
        name: "Crispy Chicken Burger",
        cat: "Burgers",
        price: 199,
        rating: 4.7,
        emoji: "🍔",
        desc: "Crispy chicken with fresh lettuce."
    },

    {
        id: 3,
        name: "Chicken Biryani",
        cat: "Indian",
        price: 249,
        rating: 4.9,
        emoji: "🍛",
        desc: "Fragrant basmati rice with spiced chicken."
    },

    {
        id: 4,
        name: "Hakka Noodles",
        cat: "Chinese",
        price: 179,
        rating: 4.6,
        emoji: "🍜",
        desc: "Wok-tossed noodles with vegetables."
    },

    {
        id: 5,
        name: "Tacos",
        cat: "Mexican",
        price: 229,
        rating: 4.5,
        emoji: "🌮",
        desc: "Loaded tacos with salsa and veggies."
    },

    {
        id: 6,
        name: "Chocolate Cake",
        cat: "Desserts",
        price: 149,
        rating: 4.8,
        emoji: "🍰",
        desc: "Rich chocolate cake with creamy frosting."
    },

    {
        id: 7,
        name: "Cold Coffee",
        cat: "Beverages",
        price: 119,
        rating: 4.4,
        emoji: "🥤",
        desc: "Chilled creamy coffee topped with foam."
    },

    {
        id: 8,
        name: "Paneer Butter Masala",
        cat: "Indian",
        price: 219,
        rating: 4.7,
        emoji: "🍲",
        desc: "Paneer in a rich buttery tomato gravy."
    },

    {
        id: 9,
        name: "Veggie Burger",
        cat: "Burgers",
        price: 159,
        rating: 4.3,
        emoji: "🍔",
        desc: "Crispy veggie patty with fresh salad."
    },

    {
        id: 10,
        name: "Farmhouse Pizza",
        cat: "Pizza",
        price: 349,
        rating: 4.8,
        emoji: "🍕",
        desc: "Loaded with vegetables and mozzarella."
    },

    {
        id: 11,
        name: "Spring Rolls",
        cat: "Chinese",
        price: 139,
        rating: 4.4,
        emoji: "🥟",
        desc: "Crispy rolls stuffed with vegetables."
    },

    {
        id: 12,
        name: "Gulab Jamun",
        cat: "Desserts",
        price: 99,
        rating: 4.7,
        emoji: "🍮",
        desc: "Soft milk dumplings in sugar syrup."
    }
];


const categories = [
    ["All", "🍽️"],
    ["Pizza", "🍕"],
    ["Burgers", "🍔"],
    ["Indian", "🍛"],
    ["Chinese", "🍜"],
    ["Mexican", "🌮"],
    ["Desserts", "🍰"],
    ["Beverages", "🥤"]
];


// =========================
// LOCAL STORAGE DATA
// =========================

let cart = JSON.parse(
    localStorage.getItem(KEY.cart) || "[]"
);

let favorites = JSON.parse(
    localStorage.getItem(KEY.fav) || "[]"
);

let orders = JSON.parse(
    localStorage.getItem(KEY.orders) || "[]"
);


// =========================
// HELPER FUNCTIONS
// =========================

const $ = id =>
    document.getElementById(id);

const money = n =>
    "₹" +
    Number(n).toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2
        }
    );


function save() {

    localStorage.setItem(
        KEY.cart,
        JSON.stringify(cart)
    );

    localStorage.setItem(
        KEY.fav,
        JSON.stringify(favorites)
    );

    localStorage.setItem(
        KEY.orders,
        JSON.stringify(orders)
    );
}


function food(id) {

    return foods.find(
        x => x.id === id
    );
}


// =========================
// CART FUNCTIONS
// =========================

function add(id) {

    let x = cart.find(
        x => x.id === id
    );

    if (x) {
        x.qty++;
    } else {
        cart.push({
            id,
            qty: 1
        });
    }

    save();

    renderCartCount();
    renderCart();

    toast("Added to cart 🛒");
}


function change(id, d) {

    let x = cart.find(
        x => x.id === id
    );

    if (!x) {
        return;
    }

    x.qty += d;

    if (x.qty <= 0) {

        cart = cart.filter(
            y => y.id !== id
        );
    }

    save();

    renderCartCount();
    renderCart();
}


// =========================
// FAVORITES
// =========================

function toggleFav(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                x => x !== id
            );

    } else {

        favorites.push(id);
    }

    save();

    renderAll();
}


// =========================
// FOOD CARD
// =========================

function card(f) {

    let fav =
        favorites.includes(f.id);

    return `
        <article class="food-card">

            <button
                class="favorite"
                onclick="toggleFav(${f.id})"
            >
                ${fav ? "❤️" : "🤍"}
            </button>


            <div class="food-image">
                ${f.emoji}
            </div>


            <div class="food-info">

                <h3>
                    ${f.name}
                </h3>

                <p>
                    ${f.desc}
                </p>

                <span class="rating">
                    ⭐ ${f.rating} • ${f.cat}
                </span>


                <div class="food-bottom">

                    <span class="price">
                        ${money(f.price)}
                    </span>

                    <button
                        class="add"
                        onclick="add(${f.id})"
                    >
                        ＋ Add
                    </button>

                </div>

            </div>

        </article>
    `;
}


// =========================
// CATEGORIES
// =========================

function renderCategories() {

    $("categories").innerHTML =
        categories
            .map(
                c => `
                    <button
                        class="category"
                        onclick="showCategory('${c[0]}')"
                    >

                        <span class="emoji">
                            ${c[1]}
                        </span>

                        <small>
                            ${c[0]}
                        </small>

                    </button>
                `
            )
            .join("");


    $("menuCategory").innerHTML =
        categories
            .slice(1)
            .map(
                c => `
                    <option value="${c[0]}">
                        ${c[1]} ${c[0]}
                    </option>
                `
            )
            .join("");
}


function showCategory(c) {

    show("menu");

    $("menuCategory").value =
        c === "All"
            ? "all"
            : c;

    renderMenu();
}


// =========================
// MENU
// =========================

function renderPopular() {

    $("popular").innerHTML =
        foods
            .slice(0, 4)
            .map(card)
            .join("");
}


function renderMenu() {

    let q =
        $("menuSearch")
            .value
            .toLowerCase();

    let c =
        $("menuCategory")
            .value;

    let s =
        $("menuSort")
            .value;


    let a = foods.filter(
        f =>
            (
                !q ||
                f.name
                    .toLowerCase()
                    .includes(q) ||
                f.cat
                    .toLowerCase()
                    .includes(q)
            )
            &&
            (
                c === "all" ||
                f.cat === c
            )
    );


    if (s === "low") {

        a.sort(
            (x, y) =>
                x.price - y.price
        );
    }


    if (s === "high") {

        a.sort(
            (x, y) =>
                y.price - x.price
        );
    }


    if (s === "popular") {

        a.sort(
            (x, y) =>
                y.rating - x.rating
        );
    }


    $("menuGrid").innerHTML =
        a.map(card).join("") ||
        '<div class="empty">No food items found.</div>';
}


// =========================
// FAVORITE FOOD
// =========================

function renderFavorites() {

    $("favoriteGrid").innerHTML =
        foods
            .filter(
                f =>
                    favorites.includes(
                        f.id
                    )
            )
            .map(card)
            .join("") ||

        `
            <div class="empty">
                No favorites yet.
                Tap 🤍 on a food item to save it.
            </div>
        `;
}


// =========================
// CART TOTALS
// =========================

function totals() {

    let sub =
        cart.reduce(
            (s, x) =>
                s +
                food(x.id).price *
                x.qty,
            0
        );

    let fee =
        sub
            ? 40
            : 0;


    return {
        sub,
        fee,
        total: sub + fee
    };
}


// =========================
// CART COUNT
// =========================

function renderCartCount() {

    let n =
        cart.reduce(
            (s, x) =>
                s + x.qty,
            0
        );

    $("cartCount").textContent = n;
    $("topCount").textContent = n;
}


// =========================
// CART DISPLAY
// =========================

function renderCart() {

    if (!cart.length) {

        $("cartItems").innerHTML = `
            <div class="empty">

                Your cart is empty 🛒

                <br><br>

                Add some delicious food
                from the menu.

            </div>
        `;

        $("cartSummary").innerHTML = "";

        $("checkoutBtn").disabled = true;

        return;
    }


    $("checkoutBtn").disabled = false;


    $("cartItems").innerHTML =
        cart
            .map(x => {

                let f =
                    food(x.id);

                return `
                    <div class="cart-row">

                        <div class="cart-food">
                            ${f.emoji}
                        </div>


                        <div class="cart-info">

                            <b>
                                ${f.name}
                            </b>

                            <small>
                                ${money(f.price)}
                                each
                            </small>

                        </div>


                        <div class="qty">

                            <button
                                onclick="change(${f.id}, -1)"
                            >
                                −
                            </button>

                            <b>
                                ${x.qty}
                            </b>

                            <button
                                onclick="change(${f.id}, 1)"
                            >
                                ＋
                            </button>

                        </div>


                        <b>
                            ${money(
                                f.price * x.qty
                            )}
                        </b>


                        <button
                            class="remove"
                            onclick="change(${f.id}, -${x.qty})"
                        >
                            🗑
                        </button>

                    </div>
                `;
            })
            .join("");


    let t = totals();


    $("cartSummary").innerHTML = `

        <div class="summary-line">

            <span>
                Subtotal
            </span>

            <b>
                ${money(t.sub)}
            </b>

        </div>


        <div class="summary-line">

            <span>
                Delivery Fee
            </span>

            <b>
                ${money(t.fee)}
            </b>

        </div>


        <div class="summary-line total">

            <span>
                Total
            </span>

            <b>
                ${money(t.total)}
            </b>

        </div>

    `;
}


// =========================
// ORDERS
// =========================

function renderOrders() {

    if (!orders.length) {

        $("orderList").innerHTML = `
            <div class="panel empty">
                No orders yet.
                Your completed orders
                will appear here.
            </div>
        `;

        return;
    }


    $("orderList").innerHTML =
        orders
            .map(
                o => `
                    <article class="order">

                        <div class="order-head">

                            <div>

                                <b>
                                    Order #${o.id}
                                </b>

                                <small>
                                    • ${o.date}
                                </small>

                            </div>

                            <span class="status">
                                ${o.status}
                            </span>

                        </div>


                        <div class="order-items">

                            ${o.items
                                .map(
                                    x =>
                                        `${x.name} × ${x.qty}`
                                )
                                .join(" • ")}

                        </div>


                        <div class="order-total">

                            Total:
                            ${money(o.total)}

                            <small>
                                • ${o.payment}
                            </small>

                        </div>

                    </article>
                `
            )
            .join("");
}


// =========================
// PAGE NAVIGATION
// =========================

function show(page) {

    document
        .querySelectorAll(".page")
        .forEach(
            x =>
                x.classList.remove(
                    "active"
                )
        );


    document
        .querySelectorAll(".nav")
        .forEach(
            x =>
                x.classList.remove(
                    "active"
                )
        );


    $(page).classList.add("active");


    document
        .querySelectorAll(
            `[data-page="${page}"]`
        )
        .forEach(
            x =>
                x.classList.add(
                    "active"
                )
        );


    $("pageTitle").textContent = {

        home: "Good food, good mood 😋",

        menu: "Explore Our Menu",

        favorites: "Your Favorite Food",

        cart: "Your Shopping Cart",

        orders: "Your Orders"

    }[page];


    if (page === "menu") {
        renderMenu();
    }

    if (page === "favorites") {
        renderFavorites();
    }

    if (page === "cart") {
        renderCart();
    }

    if (page === "orders") {
        renderOrders();
    }
}


// =========================
// RENDER ALL
// =========================

function renderAll() {

    renderPopular();

    renderMenu();

    renderFavorites();

    renderCart();

    renderOrders();

    renderCartCount();
}


// =========================
// MODAL
// =========================

function modal(id, on = true) {

    $(id).classList.toggle(
        "open",
        on
    );
}


// =========================
// TOAST MESSAGE
// =========================

function toast(msg) {

    let t =
        document.createElement(
            "div"
        );

    t.textContent = msg;


    t.style.cssText = `
        position: fixed;
        bottom: 85px;
        left: 50%;
        transform: translateX(-50%);
        background: #172033;
        color: #fff;
        padding: 11px 16px;
        border-radius: 10px;
        z-index: 200;
        font-size: 13px;
    `;


    document.body.appendChild(t);


    setTimeout(
        () => t.remove(),
        1600
    );
}


// =========================
// NAVIGATION EVENTS
// =========================

document
    .querySelectorAll(".nav")
    .forEach(
        x =>
            x.addEventListener(
                "click",
                () =>
                    show(x.dataset.page)
            )
    );


document
    .querySelectorAll("[data-go]")
    .forEach(
        x =>
            x.addEventListener(
                "click",
                () =>
                    show(x.dataset.go)
            )
    );


// =========================
// CART BUTTON
// =========================

$("topCart").addEventListener(
    "click",
    () =>
        show("cart")
);


// =========================
// HOME SEARCH
// =========================

$("homeSearch").addEventListener(
    "input",
    () => {

        $("menuSearch").value =
            $("homeSearch").value;

        show("menu");
    }
);


// =========================
// MENU SEARCH / FILTER
// =========================

$("menuSearch").addEventListener(
    "input",
    renderMenu
);

$("menuCategory").addEventListener(
    "change",
    renderMenu
);

$("menuSort").addEventListener(
    "change",
    renderMenu
);


// =========================
// CHECKOUT
// =========================

$("checkoutBtn").addEventListener(
    "click",
    () => {

        if (!cart.length) {
            return;
        }


        let t = totals();


        $("checkoutTotal").textContent =
            "Order Total: " +
            money(t.total);


        modal("checkoutModal");
    }
);


// =========================
// CLOSE MODALS
// =========================

document
    .querySelectorAll("[data-close]")
    .forEach(
        x =>
            x.addEventListener(
                "click",
                () =>
                    modal(
                        x.dataset.close,
                        false
                    )
            )
    );


document
    .querySelectorAll(".modal")
    .forEach(
        x =>
            x.addEventListener(
                "click",
                e => {

                    if (e.target === x) {

                        x.classList.remove(
                            "open"
                        );
                    }
                }
            )
    );


// =========================
// CHECKOUT FORM
// =========================

$("checkoutForm").addEventListener(
    "submit",
    e => {

        e.preventDefault();


        let t = totals();


        let id =
            String(
                Math.floor(
                    1000 +
                    Math.random() *
                    9000
                )
            );


        orders.unshift({

            id,

            date:
                new Date()
                    .toLocaleDateString(
                        "en-IN"
                    ),

            status:
                "Confirmed",

            payment:
                $("payment").value,

            total:
                t.total,

            items:
                cart.map(
                    x => ({

                        name:
                            food(x.id)
                                .name,

                        qty:
                            x.qty

                    })
                )
        });


        cart = [];


        save();


        modal(
            "checkoutModal",
            false
        );


        $("successText").textContent =
            `Order #${id} has been confirmed. ` +
            `Your food will arrive soon!`;


        modal("successModal");


        renderAll();


        e.target.reset();
    }
);


// =========================
// VIEW ORDERS
// =========================

$("viewOrders").addEventListener(
    "click",
    () => {

        modal(
            "successModal",
            false
        );

        show("orders");
    }
);


// =========================
// DARK MODE
// =========================

$("theme").addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        let d =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            KEY.theme,
            d
                ? "dark"
                : "light"
        );


        $("theme").textContent =
            d
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";
    }
);


// =========================
// INITIALIZE APPLICATION
// =========================

renderCategories();

renderAll();


if (
    localStorage.getItem(KEY.theme) ===
    "dark"
) {

    $("theme").textContent =
        "☀️ Light Mode";

    document.body.classList.add(
        "dark"
    );
}