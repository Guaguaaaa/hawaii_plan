"""Cluster the places named in docs/init_plan.md and draw a location map.

Run from the repository root:
    python3 docs/attraction_clusters.py

The coordinates are WGS84 latitude/longitude points for each location's main
entrance or centre.  They are deliberately stored here (rather than geocoded at
runtime) so the result is repeatable and does not depend on an online service.
"""

from pathlib import Path

import matplotlib

# The script is intended for non-interactive runs as well as local notebooks.
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans


# name, address / location description, latitude, longitude
ATTRACTIONS = [
    ("Honolulu Museum of Art", "900 S Beretania St, Honolulu, HI 96814", 21.30330, -157.85013),
    ("Royal Hawaiian Center", "2201 Kalakaua Ave, Honolulu, HI 96815", 21.27942, -157.83086),
    ("International Market Place", "2330 Kalakaua Ave, Honolulu, HI 96815", 21.28050, -157.82744),
    ("ABC Store (Waikiki)", "2360 Kalakaua Ave, Honolulu, HI 96815", 21.28080, -157.82717),
    ("Waikiki Beach", "Kalakaua Ave, Honolulu, HI 96815", 21.27642, -157.82692),
    ("Hanauma Bay Nature Preserve", "7455 Kalanianaole Hwy, Honolulu, HI 96825", 21.26962, -157.69381),
    ("Kahala Beach", "4999 Kahala Ave, Honolulu, HI 96816", 21.26317, -157.78745),
    ("Halona Blowhole", "Kalanianaole Hwy, Honolulu, HI 96825", 21.28334, -157.67698),
    ("Halona Beach Cove", "Kalanianaole Hwy, Honolulu, HI 96825", 21.28297, -157.67721),
    ("Lanai Lookout", "Kalanianaole Hwy, Honolulu, HI 96825", 21.27322, -157.69393),
    ("Makapuu Lookout", "Kalanianaole Hwy, Waimanalo, HI 96795", 21.30934, -157.65572),
    ("Waimanalo Beach", "41-741 Kalanianaole Hwy, Waimanalo, HI 96795", 21.34185, -157.70149),
    ("Lanikai Beach", "Mokulua Dr, Kailua, HI 96734", 21.39491, -157.71564),
    ("Kailua Town", "Kailua Rd, Kailua, HI 96734", 21.39452, -157.73957),
    ("Kalapawai Cafe & Deli", "306 S Kalaheo Ave, Kailua, HI 96734", 21.39353, -157.74414),
    ("Adela's Country Eatery", "46-018 Kamehameha Hwy, Kaneohe, HI 96744", 21.41957, -157.80317),
    ("Byodo-In Temple", "47-200 Kahekili Hwy, Kaneohe, HI 96744", 21.47408, -157.83517),
    ("Valley of the Temples Memorial Park", "47-200 Kahekili Hwy, Kaneohe, HI 96744", 21.47182, -157.83519),
    ("Tantalus Lookout (Puu Ualakaa)", "Nuuanu Pali Dr, Honolulu, HI 96813", 21.32865, -157.82699),
    ("Musubi Cafe Iyasume (Waikiki)", "2427 Kuhio Ave, Honolulu, HI 96815", 21.27931, -157.82563),
    ("Maguro Spot", "2441 Kuhio Ave, Honolulu, HI 96815", 21.27930, -157.82522),
    ("Dole Plantation", "64-1550 Kamehameha Hwy, Wahiawa, HI 96786", 21.52174, -158.03717),
    ("Pineapple Express Train", "Dole Plantation, 64-1550 Kamehameha Hwy", 21.52174, -158.03717),
    ("Pineapple Garden Maze", "Dole Plantation, 64-1550 Kamehameha Hwy", 21.52174, -158.03717),
    ("Dole Whip", "Dole Plantation, 64-1550 Kamehameha Hwy", 21.52174, -158.03717),
    ("Giovanni's Shrimp Truck (Kahuku)", "56-505 Kamehameha Hwy, Kahuku, HI 96731", 21.67884, -157.95169),
    ("Haleiwa Joe's", "66-011 Kamehameha Hwy, Haleiwa, HI 96712", 21.60032, -158.10333),
    ("Haleiwa Town", "66-001 Kamehameha Hwy, Haleiwa, HI 96712", 21.59230, -158.10395),
    ("Matsumoto Shave Ice", "66-111 Kamehameha Hwy, Haleiwa, HI 96712", 21.59208, -158.10484),
    ("Snoopy's Surf Shop", "66-145 Kamehameha Hwy, Haleiwa, HI 96712", 21.59201, -158.10504),
    ("Laniakea Beach", "Kamehameha Hwy, Haleiwa, HI 96712", 21.61878, -158.08725),
    ("Waimea Bay", "61-031 Kamehameha Hwy, Haleiwa, HI 96712", 21.64141, -158.06424),
    ("Sunset Beach", "59-104 Kamehameha Hwy, Haleiwa, HI 96712", 21.67847, -158.04210),
    ("Kualoa Ranch", "49-560 Kamehameha Hwy, Kaneohe, HI 96744", 21.52302, -157.83744),
    ("Ranch House", "Kualoa Ranch, 49-560 Kamehameha Hwy", 21.52302, -157.83744),
    ("Kualoa Regional Park", "49-479 Kamehameha Hwy, Kaneohe, HI 96744", 21.51575, -157.84162),
    ("Ho'omaluhia Botanical Garden", "45-680 Luluku Rd, Kaneohe, HI 96744", 21.36839, -157.80110),
    ("Diamond Head State Monument", "Diamond Head Rd, Honolulu, HI 96815", 21.26195, -157.80508),
    ("Pearl Harbor National Memorial", "1 Arizona Memorial Pl, Honolulu, HI 96818", 21.36518, -157.95007),
    ("USS Arizona Memorial", "1 Arizona Memorial Pl, Honolulu, HI 96818", 21.36528, -157.94982),
]

N_CLUSTERS = 5


def main() -> None:
    points = [(latitude, longitude) for _, _, latitude, longitude in ATTRACTIONS]
    model = KMeans(n_clusters=N_CLUSTERS, random_state=42, n_init=20)
    labels = model.fit_predict(points)

    fig, ax = plt.subplots(figsize=(12, 9), constrained_layout=True)
    palette = plt.get_cmap("tab10")
    for cluster in range(N_CLUSTERS):
        indices = [i for i, label in enumerate(labels) if label == cluster]
        ax.scatter(
            [points[i][1] for i in indices], [points[i][0] for i in indices],
            s=62, color=palette(cluster), edgecolor="white", linewidth=0.8,
            label=f"Cluster {cluster + 1} ({len(indices)} places)", zorder=3,
        )

    centers = model.cluster_centers_
    ax.scatter(centers[:, 1], centers[:, 0], marker="X", s=160, c="black",
               edgecolor="white", linewidth=1.2, label="Cluster center", zorder=5)
    ax.set(title=f"Oahu itinerary locations — K-means (k={N_CLUSTERS})",
           xlabel="Longitude (°E)", ylabel="Latitude (°N)")
    ax.set_aspect("equal", adjustable="box")
    ax.grid(True, linewidth=0.45, alpha=0.45, zorder=0)
    ax.legend(loc="upper left", fontsize=8, frameon=True)

    output = Path(__file__).with_name("attraction_clusters.png")
    fig.savefig(output, dpi=220, bbox_inches="tight")
    print(f"Saved {output}")


if __name__ == "__main__":
    main()
