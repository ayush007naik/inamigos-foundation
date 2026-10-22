#!/usr/bin/env python3
"""Generates src/data/posts.ts from the extracted official blog content."""
import json
import re

RAW = json.load(open("/tmp/posts.json", encoding="utf-8"))

# slug -> (local image asset id, short label used in cards)
IMAGE_MAP = {
    "Project-Vikas-Transforming-Careers-One-Internship-at-a-Time": "post-vikas",
    "mission-life-sustainable-future-inamigos-foundation": "post-mission-life",
    "save-water-save-life": "post-save-water",
    "adopt-healthy-lifestyle-holistic-well-being": "post-healthy-lifestyle",
    "udaan-women-rise-dreams-soar-change-begins": "post-udaan",
    "project-jeev-in-this-life-save-a-life": "post-jeev",
    "embracing-life-sustainable-living-with-inamigos-foundation": "post-embracing-life",
    "inamigos-foundation-transforming-lives": "post-transforming-lives",
    "bachpanshala-shaping-dreams-with-inamigos": "post-bachpanshala",
    "Protect-Wildlife-Protect-Ourselves-A-Harmonious-Future-": "post-animal-protection",
}

# The official site stores two articles as one rich-text blob; these are the
# hand-split equivalents, with wording taken verbatim from the source.
BLOB_SPLITS = {
    "Project-Vikas-Transforming-Careers-One-Internship-at-a-Time": [
        ("p", "For the past four years, InAmigos Foundation has been committed to empowering young minds through Project Vikas, an initiative that has revolutionized internship opportunities across various domains. With a vision to bridge the gap between education and employability, we have successfully provided 1,000+ internship opportunities, engaged with 100,000+ interns, and onboarded 30,000+ interns into diverse fields."),
        ("h3", "Diverse Internship Opportunities"),
        ("p", "Our extensive internship programs cater to multiple career paths, ensuring students gain hands-on experience in their areas of interest. Some of our most sought-after internships include:"),
        ("li", "Digital Marketing & Social Media Marketing – Practical exposure to brand building and online engagement strategies."),
        ("li", "Content Writing & Graphic Designing – Refining creative storytelling and design skills for impactful communication."),
        ("li", "HR Internship & Community Management – Learning the art of talent acquisition, employee engagement, and team building."),
        ("li", "Volunteering & Virtual Volunteering – Encouraging social responsibility and remote engagement."),
        ("li", "Hosting & Event Management – Enhancing leadership and coordination skills through live and virtual events."),
        ("li", "Public Relations (PR) & Fundraising & CSR – Building networks and contributing to social change."),
        ("li", "Market Research & Operations & Management – Gaining insights into consumer behavior and business operations."),
        ("li", "Video Editing & Entrepreneurship & Startup Internship – Shaping future entrepreneurs and creative professionals."),
        ("h3", "Beyond Internships: Skill Development & Career Guidance"),
        ("p", "At Project Vikas, we believe in holistic development. Our initiatives go beyond internships, ensuring students are well-equipped with essential career skills. We actively conduct:"),
        ("li", "Webinars, Seminars, and Live Shows – Featuring industry experts sharing valuable insights."),
        ("li", "Talent Shows & Events – Providing platforms for students to showcase their abilities."),
        ("li", "Resume Building & Interview Preparation – Enhancing employability through professional guidance."),
        ("h3", "Reaching Every Corner of India"),
        ("p", "Our impact extends PAN India, reaching students from diverse backgrounds. Many of our interns have transitioned into full-time careers, securing roles in leading organizations. Join Project Vikas and become part of a movement that is shaping the future workforce. Opportunities await – are you ready to grow with us?"),
    ],
    "save-water-save-life": [
        ("p", "Water is the essence of life, a resource so vital yet so undervalued. Despite covering over 70% of the Earth’s surface, less than 1% of water is accessible and safe for human consumption. At InAmigos Foundation, we believe that saving water is not just an environmental necessity but also a responsibility for ensuring a sustainable future."),
        ("h3", "The Global Water Crisis"),
        ("p", "The world is facing a water crisis. According to the United Nations, around 2 billion people lack access to safe drinking water, and by 2025, half of the world’s population is expected to live in water-stressed areas. From prolonged droughts to over-extraction of groundwater, the challenges are escalating. But the crisis isn’t just global; it’s personal. Every drop of water wasted today is a drop stolen from future generations."),
        ("h3", "Why Saving Water Matters"),
        ("li", "Environmental Balance: Conserving water helps maintain the ecological balance, supporting the survival of countless species."),
        ("li", "Agricultural Sustainability: Agriculture consumes about 70% of global freshwater. Efficient water use ensures food security."),
        ("li", "Energy Conservation: Pumping, treating, and delivering water require energy. Saving water reduces the carbon footprint."),
        ("li", "Mitigating Climate Change: Droughts and water scarcity are worsened by climate change. Conserving water helps adapt to these changes."),
        ("h3", "InAmigos Foundation’s Initiatives"),
        ("p", "At InAmigos Foundation, we are committed to spreading awareness and driving action for water conservation through several impactful projects:"),
        ("li", "Rainwater Harvesting Campaigns — We actively promote the installation of rainwater harvesting systems in urban and rural areas. These systems capture and store rainwater, reducing dependence on groundwater and ensuring its sustainable use."),
        ("li", "Workshops on Water Management — Through interactive workshops, we educate communities, schools, and organizations about efficient water usage, leak detection, and adopting water-saving habits."),
        ("li", "Tree Plantation Drives — Trees play a crucial role in preserving water in the soil and maintaining the water cycle. Our plantation drives across drought-prone regions aim to improve groundwater recharge."),
        ("li", "Clean Water Accessibility — In partnership with local governments and NGOs, we work to provide clean drinking water to underserved communities, ensuring that access to water is a right, not a privilege."),
        ("h3", "Simple Ways You Can Save Water"),
        ("p", "Water conservation starts with you. Here are a few steps to make a difference:"),
        ("li", "Fix Leaks: A dripping faucet can waste over 3,000 liters of water a year."),
        ("li", "Turn Off Taps: Don’t let the water run while brushing your teeth or washing dish."),
        ("li", "Use Water-Efficient Fixtures: Opt for low-flow showerheads and dual-flush toilets."),
        ("li", "Reuse Water: Collect water used for washing vegetables to water plants."),
        ("li", "Educate Others: Share water-saving tips with friends, family, and colleagues."),
        ("h3", "A Call to Action"),
        ("p", "At InAmigos Foundation, we envision a future where everyone has access to clean water and respects its value. But we cannot achieve this alone. It requires collective effort—individuals, communities, and organizations must join hands to make water conservation a way of life. Let’s remember, every drop counts. Together, we can ensure that water continues to nourish life on Earth. Join us in our mission to save water and secure a better tomorrow. Take the pledge today with InAmigos Foundation to conserve water and spread awareness."),
    ],
}

# Headings that were stored as paragraphs on the official site.
PROMOTE_TO_HEADING = {
    "Introduction",
    "The Mission Behind BachpanShala",
    "How BachpanShala Makes a Difference",
    "How You Can Be Part of This Journey",
    "A Brighter Future with InAmigos Foundation",
    "What is Project Jeev?",
    "Features of the Project",
    "How Can You Help?",
    "Donations",
    "Volunteer",
    "Spread Awareness",
    "Participate in Fundraising",
    "The Importance of Animal Protection:",
    "Challenges Faced by Wildlife:",
    "Our Role in Animal Protection:",
    "Conclusion",
    "Why Is a Healthy Lifestyle Important?",
    "Steps to Adopting a Healthy Lifestyle",
    "Benefits of a Healthy Lifestyle",
    "Udaan: Empowering Women, Enriching Communities",
    "What Makes Udaan Unique?",
    "Skill Training That Transforms Lives",
    "Supporting Women Entrepreneurs",
    "Holistic Empowerment",
    "Building a Support Network",
    "Our Impact So Far",
    "Join the Udaan Movement",
    "Let’s Give More Women the Wings to Soar",
    "LIFE Themes",
    "InAmigos Foundation’s Initiatives",
    "Call to Action",
    "Five Core Programs",
    "A Shared Vision for a Better Tomorrow",
    "Project Seva: Distribution of Food and Clothing",
    "Project Bachpanshala: Education for Children",
    "Project Jeev: Feeding and Protecting Animals",
    "Project Udaan: Empowerment of Women",
    "Project Prakriti: Environmental Protection",
}

AUTHOR_RE = re.compile(r"^Written by\s+(.+)$")


def ts(value):
    return json.dumps(value, ensure_ascii=False)


def blocks_for(slug):
    if slug in BLOB_SPLITS:
        return [{"t": t, "x": x} for t, x in BLOB_SPLITS[slug]], ""
    out = []
    for b in RAW[slug]["body"]:
        text = b["x"]
        kind = b["t"]
        if kind == "h3" and text in ("", "Blog"):
            continue
        # The first h3 is the article title, already stored separately.
        out.append({"t": kind, "x": text})
    # Drop the duplicate leading title block
    if out and out[0]["t"] == "h3":
        out = out[1:]
    if out and out[0]["t"] == "p" and out[0]["x"] == out[1]["x"] if len(out) > 1 else False:
        out = out[1:]
    # Promote known section headings and extract authors
    cleaned = []
    author = ""
    for b in out:
        text = b["x"]
        m = AUTHOR_RE.match(text)
        if m:
            author = m.group(1).strip()
            continue
        if b["t"] == "p" and text in PROMOTE_TO_HEADING:
            cleaned.append({"t": "h3", "x": text})
            continue
        if b["t"] == "p" and text.startswith("• "):
            cleaned.append({"t": "li", "x": text[2:].strip()})
            continue
        if b["t"] == "p" and text.endswith(":"):
            cleaned.append({"t": "h3", "x": text})
            continue
        cleaned.append(b)
    return cleaned, author


def excerpt(text, n=190):
    text = re.sub(r"\s+", " ", text).strip()
    return text[:n].rsplit(" ", 1)[0] + "…"


ORDER = list(IMAGE_MAP.keys())

lines = [
    "// ---------------------------------------------------------------------------",
    "// Blog articles — content verified against the official site",
    "// (https://www.inamigosfoundation.org.in/blog). Generated by",
    "// scripts/extract-posts.py; do not hand-edit without re-verifying the source.",
    "// ---------------------------------------------------------------------------",
    "",
    "export type PostBlock =",
    "  | { t: 'p'; x: string }",
    "  | { t: 'h3'; x: string }",
    "  | { t: 'h4'; x: string }",
    "  | { t: 'li'; x: string }",
    "",
    "export interface Post {",
    "  slug: string",
    "  title: string",
    "  excerpt: string",
    "  date: string",
    "  isoDate: string",
    "  category: string",
    "  views: number",
    "  comments: number",
    "  author: string",
    "  image: string",
    "  imageAlt: string",
    "  body: PostBlock[]",
    "}",
    "",
    "export const POSTS: Post[] = [",
]

for slug in ORDER:
    meta = RAW[slug]["meta"]
    body, author = blocks_for(slug)
    title = meta.get("title", slug)
    # first paragraph of the body is the best excerpt source
    first_p = next((b["x"] for b in body if b["t"] == "p"), title)
    image_id = IMAGE_MAP[slug]
    # derive an ISO date from the display date
    months = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
              "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"}
    dm = re.match(r"(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})", meta.get("date", ""))
    iso = f"{dm.group(3)}-{months.get(dm.group(2), '01')}-{int(dm.group(1)):02d}" if dm else "2025-01-30"

    lines.append("  {")
    lines.append(f"    slug: {ts(slug)},")
    lines.append(f"    title: {ts(title)},")
    lines.append(f"    excerpt: {ts(excerpt(first_p))},")
    lines.append(f"    date: {ts(meta.get('date', ''))},")
    lines.append(f"    isoDate: {ts(iso)},")
    lines.append(f"    category: {ts(meta.get('category', 'Social Impact'))},")
    lines.append(f"    views: {meta.get('views', 0)},")
    lines.append(f"    comments: {meta.get('comments', 0)},")
    lines.append(f"    author: {ts(author or 'InAmigos Foundation')},")
    lines.append(f"    image: '/img/{image_id}.webp',")
    lines.append(f"    imageAlt: {ts(title)},")
    lines.append("    body: [")
    for b in body:
        lines.append(f"      {{ t: '{b['t']}', x: {ts(b['x'])} }},")
    lines.append("    ],")
    lines.append("  },")

lines.append("]")
lines.append("")
lines.append("export const POST_CATEGORIES = Array.from(new Set(POSTS.map((p) => p.category))).sort()")
lines.append("")
lines.append("export function getPost(slug: string): Post | undefined {")
lines.append("  return POSTS.find((p) => p.slug === slug)")
lines.append("}")
lines.append("")

open("src/data/posts.ts", "w", encoding="utf-8").write("\n".join(lines))
print(f"✓ src/data/posts.ts — {len(ORDER)} posts")
