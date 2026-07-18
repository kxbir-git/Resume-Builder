import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/mock-data";

type Props = { data: ResumeData; template: string; accent: string };

// A4 dimensions: 595.28 x 841.89 pt
const PAGE = { width: 595.28, height: 841.89 };

const fallback = (s: string | undefined, alt = "") => (s && s.trim() ? s : alt);

export function ResumeDocument({ data, template, accent }: Props) {
  return (
    <Document title={`${data.personal.fullName} — Resume`} author={data.personal.fullName}>
      {template === "minimal" && <MinimalPage data={data} accent={accent} />}
      {template === "corporate" && <CorporatePage data={data} accent={accent} />}
      {template === "creative" && <CreativePage data={data} accent={accent} />}
      {template === "ats" && <AtsPage data={data} accent={accent} />}
      {template === "classic" && <ClassicPage data={data} accent={accent} />}
      {(template === "modern" || !["minimal", "corporate", "creative", "ats", "classic"].includes(template)) && (
        <ModernPage data={data} accent={accent} />
      )}
    </Document>
  );
}

/* ───────────────── MODERN ───────────────── */
const modern = StyleSheet.create({
  page: { flexDirection: "row", backgroundColor: "#FFFFFF", fontSize: 10, fontFamily: "Helvetica", color: "#2A2A2A" },
  sidebar: { width: "34%", padding: 24, color: "#FFFFFF" },
  avatar: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center", justifyContent: "center", marginBottom: 12,
  },
  avatarText: { color: "#FFFFFF", fontSize: 22, fontFamily: "Helvetica-Bold" },
  name: { fontSize: 18, fontFamily: "Helvetica-Bold", lineHeight: 1.15, marginBottom: 2 },
  role: { fontSize: 10, opacity: 0.92 },
  divider: { borderTopWidth: 0.6, borderColor: "rgba(255,255,255,0.4)", marginVertical: 12 },
  contact: { fontSize: 9, marginBottom: 4, lineHeight: 1.4 },
  sideHead: { fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.2, marginTop: 12, marginBottom: 6, opacity: 0.95 },
  chipRow: { flexDirection: "row", flexWrap: "wrap" },
  chip: { backgroundColor: "rgba(255,255,255,0.22)", color: "#FFFFFF", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, fontSize: 9, marginRight: 4, marginBottom: 4 },
  side: { fontSize: 9, lineHeight: 1.45 },
  main: { flex: 1, padding: 24 },
  mainHead: { fontSize: 10, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 6, marginTop: 6 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  itemTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold" },
  itemSub: { fontSize: 9.5, color: "#5B5B5B", fontStyle: "italic", marginTop: 1 },
  itemMeta: { fontSize: 9, color: "#7A7A7A" },
  itemDesc: { fontSize: 10, marginTop: 3, lineHeight: 1.45 },
  blockGap: { marginBottom: 8 },
});

function ModernPage({ data, accent }: { data: ResumeData; accent: string }) {
  const initials = data.personal.fullName.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <Page size={[PAGE.width, PAGE.height]} style={modern.page}>
      <View style={[modern.sidebar, { backgroundColor: accent }]}>
        <View style={modern.avatar}><Text style={modern.avatarText}>{initials}</Text></View>
        <Text style={modern.name}>{data.personal.fullName}</Text>
        <Text style={modern.role}>{data.personal.title}</Text>
        <View style={modern.divider} />
        {data.personal.email ? <Text style={modern.contact}>{data.personal.email}</Text> : null}
        {data.personal.phone ? <Text style={modern.contact}>{data.personal.phone}</Text> : null}
        {data.personal.location ? <Text style={modern.contact}>{data.personal.location}</Text> : null}
        {data.personal.website ? <Text style={modern.contact}>{data.personal.website}</Text> : null}

        {data.skills.length > 0 && (
          <>
            <Text style={modern.sideHead}>Skills</Text>
            <View style={modern.chipRow}>
              {data.skills.map(s => <Text key={s} style={modern.chip}>{s}</Text>)}
            </View>
          </>
        )}
        {data.languages.length > 0 && (
          <>
            <Text style={modern.sideHead}>Languages</Text>
            {data.languages.map(l => <Text key={l.id} style={modern.side}>{l.name} — {l.level}</Text>)}
          </>
        )}
        {data.hobbies.length > 0 && (
          <>
            <Text style={modern.sideHead}>Hobbies</Text>
            <Text style={modern.side}>{data.hobbies.join(" · ")}</Text>
          </>
        )}
      </View>

      <View style={modern.main}>
        {data.objective ? (
          <>
            <Text style={[modern.mainHead, { color: accent }]}>Profile</Text>
            <Text style={[modern.itemDesc, modern.blockGap]}>{data.objective}</Text>
          </>
        ) : null}

        {data.experience.length > 0 && (
          <>
            <Text style={[modern.mainHead, { color: accent }]}>Experience</Text>
            {data.experience.map(x => (
              <View key={x.id} style={modern.blockGap} wrap={false}>
                <View style={modern.rowBetween}>
                  <Text style={modern.itemTitle}>{x.role}</Text>
                  <Text style={modern.itemMeta}>{x.period}</Text>
                </View>
                <Text style={modern.itemSub}>{x.company}</Text>
                {x.description ? <Text style={modern.itemDesc}>{x.description}</Text> : null}
              </View>
            ))}
          </>
        )}

        {data.education.length > 0 && (
          <>
            <Text style={[modern.mainHead, { color: accent }]}>Education</Text>
            {data.education.map(e => (
              <View key={e.id} style={modern.blockGap} wrap={false}>
                <View style={modern.rowBetween}>
                  <Text style={modern.itemTitle}>{e.degree}</Text>
                  <Text style={modern.itemMeta}>{e.period}</Text>
                </View>
                <Text style={modern.itemSub}>{e.school}</Text>
                {e.description ? <Text style={modern.itemDesc}>{e.description}</Text> : null}
              </View>
            ))}
          </>
        )}

        {data.projects.length > 0 && (
          <>
            <Text style={[modern.mainHead, { color: accent }]}>Projects</Text>
            {data.projects.map(p => (
              <View key={p.id} style={modern.blockGap} wrap={false}>
                <Text style={modern.itemTitle}>{p.name} <Text style={modern.itemMeta}>— {p.link}</Text></Text>
                <Text style={modern.itemDesc}>{p.description}</Text>
              </View>
            ))}
          </>
        )}

        {data.certifications.length > 0 && (
          <>
            <Text style={[modern.mainHead, { color: accent }]}>Certifications</Text>
            {data.certifications.map(c => (
              <Text key={c.id} style={modern.itemDesc}>{c.name} — {c.issuer}, {c.year}</Text>
            ))}
          </>
        )}
      </View>
    </Page>
  );
}

/* ───────────────── MINIMAL ───────────────── */
const minimal = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", padding: 48, fontSize: 10.5, fontFamily: "Helvetica", color: "#2A2A2A", lineHeight: 1.5 },
  name: { fontSize: 28, fontFamily: "Helvetica", letterSpacing: -0.5 },
  role: { fontSize: 12, marginTop: 2 },
  contact: { fontSize: 9, color: "#7A7A7A", marginTop: 8 },
  rule: { borderBottomWidth: 0.6, borderColor: "#E5E5E5", marginTop: 20, marginBottom: 24 },
  objective: { fontStyle: "italic", color: "#444", marginBottom: 22, fontSize: 11 },
  head: { fontSize: 9.5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 2, marginTop: 6, marginBottom: 10 },
  item: { marginBottom: 10 },
  titleLine: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  meta: { color: "#7A7A7A", fontSize: 9.5, marginTop: 1 },
  desc: { marginTop: 4, fontSize: 10.5 },
});

function MinimalPage({ data, accent }: { data: ResumeData; accent: string }) {
  return (
    <Page size={[PAGE.width, PAGE.height]} style={minimal.page}>
      <Text style={minimal.name}>{data.personal.fullName}</Text>
      <Text style={[minimal.role, { color: accent }]}>{data.personal.title}</Text>
      <Text style={minimal.contact}>
        {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website].filter(Boolean).join("  ·  ")}
      </Text>
      <View style={minimal.rule} />
      {data.objective ? <Text style={minimal.objective}>{data.objective}</Text> : null}

      <Text style={[minimal.head, { color: accent }]}>Experience</Text>
      {data.experience.map(x => (
        <View key={x.id} style={minimal.item} wrap={false}>
          <Text style={minimal.titleLine}>{x.role} <Text style={{ fontFamily: "Helvetica" }}>· {x.company}</Text></Text>
          <Text style={minimal.meta}>{x.period}</Text>
          {x.description ? <Text style={minimal.desc}>{x.description}</Text> : null}
        </View>
      ))}

      <Text style={[minimal.head, { color: accent }]}>Education</Text>
      {data.education.map(e => (
        <View key={e.id} style={minimal.item} wrap={false}>
          <Text style={minimal.titleLine}>{e.degree}, {e.school}</Text>
          <Text style={minimal.meta}>{e.period}</Text>
        </View>
      ))}

      {data.skills.length > 0 && (
        <>
          <Text style={[minimal.head, { color: accent }]}>Skills</Text>
          <Text style={minimal.desc}>{data.skills.join(" · ")}</Text>
        </>
      )}
    </Page>
  );
}

/* ───────────────── CORPORATE ───────────────── */
const corp = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", fontSize: 10, fontFamily: "Helvetica", color: "#2A2A2A" },
  header: { paddingHorizontal: 36, paddingTop: 32, paddingBottom: 18, borderBottomWidth: 3 },
  name: { fontSize: 26, fontFamily: "Helvetica-Bold" },
  role: { fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#5B5B5B", marginTop: 2 },
  contact: { fontSize: 9, color: "#7A7A7A", marginTop: 8 },
  body: { padding: 36 },
  head: { fontSize: 10, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.4, marginTop: 6, marginBottom: 8 },
  item: { marginBottom: 10 },
  itemTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  meta: { fontSize: 9, color: "#7A7A7A", marginTop: 1 },
  desc: { fontSize: 10, marginTop: 3, lineHeight: 1.45 },
  twoCol: { flexDirection: "row", gap: 24, marginTop: 8 },
  col: { flex: 1 },
});

function CorporatePage({ data, accent }: { data: ResumeData; accent: string }) {
  return (
    <Page size={[PAGE.width, PAGE.height]} style={corp.page}>
      <View style={[corp.header, { borderBottomColor: accent }]}>
        <Text style={[corp.name, { color: accent }]}>{data.personal.fullName}</Text>
        <Text style={corp.role}>{data.personal.title}</Text>
        <Text style={corp.contact}>{[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join("  |  ")}</Text>
      </View>
      <View style={corp.body}>
        {data.objective ? (
          <>
            <Text style={[corp.head, { color: accent }]}>Summary</Text>
            <Text style={corp.desc}>{data.objective}</Text>
          </>
        ) : null}

        <Text style={[corp.head, { color: accent, marginTop: 14 }]}>Professional Experience</Text>
        {data.experience.map(x => (
          <View key={x.id} style={corp.item} wrap={false}>
            <Text style={corp.itemTitle}>{x.role} — {x.company}</Text>
            <Text style={corp.meta}>{x.period}</Text>
            {x.description ? <Text style={corp.desc}>{x.description}</Text> : null}
          </View>
        ))}

        <View style={corp.twoCol}>
          <View style={corp.col}>
            <Text style={[corp.head, { color: accent }]}>Education</Text>
            {data.education.map(e => (
              <View key={e.id} style={corp.item} wrap={false}>
                <Text style={corp.itemTitle}>{e.degree}</Text>
                <Text style={corp.desc}>{e.school}, {e.period}</Text>
              </View>
            ))}
          </View>
          <View style={corp.col}>
            <Text style={[corp.head, { color: accent }]}>Core Skills</Text>
            <Text style={corp.desc}>{data.skills.join(", ")}</Text>
          </View>
        </View>
      </View>
    </Page>
  );
}

/* ───────────────── CREATIVE ───────────────── */
const creative = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", fontSize: 10, fontFamily: "Helvetica", color: "#2A2A2A" },
  header: { padding: 32, color: "#FFFFFF" },
  name: { fontSize: 32, fontFamily: "Helvetica-Bold", lineHeight: 1 },
  role: { fontSize: 13, marginTop: 6 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 14 },
  contact: { fontSize: 9.5, marginRight: 14, color: "#FFFFFF" },
  body: { padding: 32 },
  head: { fontSize: 10.5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 8, marginBottom: 8 },
  item: { marginBottom: 10, paddingLeft: 10, borderLeftWidth: 2 },
  itemTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  meta: { fontSize: 9.5, fontStyle: "italic", color: "#666", marginTop: 1 },
  desc: { fontSize: 10, marginTop: 3, lineHeight: 1.45 },
  chip: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, fontSize: 9.5, color: "#FFFFFF", marginRight: 5, marginBottom: 5, fontFamily: "Helvetica-Bold" },
  chipRow: { flexDirection: "row", flexWrap: "wrap" },
});

function CreativePage({ data, accent }: { data: ResumeData; accent: string }) {
  return (
    <Page size={[PAGE.width, PAGE.height]} style={creative.page}>
      <View style={[creative.header, { backgroundColor: accent }]}>
        <Text style={creative.name}>{data.personal.fullName}</Text>
        <Text style={creative.role}>— {data.personal.title}</Text>
        <View style={creative.contactRow}>
          {data.personal.email ? <Text style={creative.contact}>✉ {data.personal.email}</Text> : null}
          {data.personal.phone ? <Text style={creative.contact}>☎ {data.personal.phone}</Text> : null}
          {data.personal.location ? <Text style={creative.contact}>◉ {data.personal.location}</Text> : null}
          {data.personal.website ? <Text style={creative.contact}>↗ {data.personal.website}</Text> : null}
        </View>
      </View>
      <View style={creative.body}>
        {data.objective ? (
          <>
            <Text style={[creative.head, { color: accent }]}>Hello!</Text>
            <Text style={[creative.desc, { fontSize: 11 }]}>{data.objective}</Text>
          </>
        ) : null}

        <Text style={[creative.head, { color: accent, marginTop: 14 }]}>Where I've worked</Text>
        {data.experience.map(x => (
          <View key={x.id} style={[creative.item, { borderLeftColor: accent }]} wrap={false}>
            <Text style={creative.itemTitle}>{x.role}</Text>
            <Text style={creative.meta}>{x.company} · {x.period}</Text>
            {x.description ? <Text style={creative.desc}>{x.description}</Text> : null}
          </View>
        ))}

        {data.skills.length > 0 && (
          <>
            <Text style={[creative.head, { color: accent, marginTop: 8 }]}>Tools & Skills</Text>
            <View style={creative.chipRow}>
              {data.skills.map(s => <Text key={s} style={[creative.chip, { backgroundColor: accent }]}>{s}</Text>)}
            </View>
          </>
        )}

        {data.education.length > 0 && (
          <>
            <Text style={[creative.head, { color: accent, marginTop: 8 }]}>Education</Text>
            {data.education.map(e => (
              <View key={e.id} style={[creative.item, { borderLeftColor: accent }]} wrap={false}>
                <Text style={creative.itemTitle}>{e.degree}</Text>
                <Text style={creative.meta}>{e.school} · {e.period}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    </Page>
  );
}

/* ───────────────── ATS ───────────────── */
const ats = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", padding: 40, fontSize: 11, fontFamily: "Helvetica", color: "#000000", lineHeight: 1.45 },
  name: { fontSize: 18, fontFamily: "Helvetica-Bold", textTransform: "uppercase" },
  contact: { fontSize: 10.5 },
  rule: { borderBottomWidth: 1, borderColor: "#000", marginVertical: 10 },
  head: { fontSize: 11.5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginTop: 10, marginBottom: 4 },
  item: { marginBottom: 6 },
  title: { fontFamily: "Helvetica-Bold", fontSize: 11 },
});

function AtsPage({ data }: { data: ResumeData; accent: string }) {
  return (
    <Page size={[PAGE.width, PAGE.height]} style={ats.page}>
      <Text style={ats.name}>{data.personal.fullName}</Text>
      <Text style={ats.contact}>
        {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website].filter(Boolean).join(" | ")}
      </Text>
      <View style={ats.rule} />
      <Text style={ats.head}>Summary</Text>
      <Text>{fallback(data.objective)}</Text>
      <Text style={ats.head}>Experience</Text>
      {data.experience.map(x => (
        <View key={x.id} style={ats.item} wrap={false}>
          <Text style={ats.title}>{x.role}, {x.company} ({x.period})</Text>
          <Text>{x.description}</Text>
        </View>
      ))}
      <Text style={ats.head}>Education</Text>
      {data.education.map(e => (
        <Text key={e.id}>{e.degree}, {e.school} ({e.period})</Text>
      ))}
      <Text style={ats.head}>Skills</Text>
      <Text>{data.skills.join(", ")}</Text>
    </Page>
  );
}

/* ───────────────── CLASSIC ───────────────── */
const classic = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", padding: 48, fontSize: 10.5, fontFamily: "Times-Roman", color: "#1A1A1A", lineHeight: 1.45 },
  header: { alignItems: "center", marginBottom: 14 },
  name: { fontSize: 26, fontFamily: "Times-Bold", letterSpacing: 1 },
  role: { fontSize: 12, fontFamily: "Times-Italic", marginTop: 2 },
  contact: { fontSize: 10, marginTop: 4 },
  divider: { width: 80, borderBottomWidth: 1.5, alignSelf: "center", marginTop: 10 },
  head: { fontSize: 10.5, fontFamily: "Times-Bold", textTransform: "uppercase", letterSpacing: 1.3, marginTop: 12, marginBottom: 6, textAlign: "center" },
  item: { marginBottom: 8 },
  title: { fontFamily: "Times-Bold", fontSize: 11 },
  meta: { fontFamily: "Times-Italic", fontSize: 9.5, marginTop: 1 },
});

function ClassicPage({ data, accent }: { data: ResumeData; accent: string }) {
  return (
    <Page size={[PAGE.width, PAGE.height]} style={classic.page}>
      <View style={classic.header}>
        <Text style={[classic.name, { color: accent }]}>{data.personal.fullName}</Text>
        <Text style={classic.role}>{data.personal.title}</Text>
        <Text style={classic.contact}>
          {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join("  ·  ")}
        </Text>
        <View style={[classic.divider, { borderBottomColor: accent }]} />
      </View>
      {data.objective ? (
        <>
          <Text style={[classic.head, { color: accent }]}>Objective</Text>
          <Text style={{ fontFamily: "Times-Italic" }}>{data.objective}</Text>
        </>
      ) : null}
      <Text style={[classic.head, { color: accent }]}>Experience</Text>
      {data.experience.map(x => (
        <View key={x.id} style={classic.item} wrap={false}>
          <Text style={classic.title}>{x.role}, {x.company}</Text>
          <Text style={classic.meta}>{x.period}</Text>
          {x.description ? <Text>{x.description}</Text> : null}
        </View>
      ))}
      <Text style={[classic.head, { color: accent }]}>Education</Text>
      {data.education.map(e => (
        <Text key={e.id}><Text style={{ fontFamily: "Times-Bold" }}>{e.degree}</Text>, {e.school} — {e.period}</Text>
      ))}
      <Text style={[classic.head, { color: accent }]}>Skills</Text>
      <Text>{data.skills.join(" · ")}</Text>
    </Page>
  );
}

// Silence unused-import warning (Link reserved for future use)
export const _link = Link;
