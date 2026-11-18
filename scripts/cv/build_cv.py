"""Genera el CV estilo Harvard en public/cv/Imelda-Almanza-CV.pdf.

Uso:  python scripts/cv/build_cv.py
Requiere: reportlab (python -m pip install reportlab)
"""
from pathlib import Path

from reportlab.lib.colors import black
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "cv" / "Imelda-Almanza-CV.pdf"

FONTS = Path("C:/Windows/Fonts")
pdfmetrics.registerFont(TTFont("Serif", str(FONTS / "times.ttf")))
pdfmetrics.registerFont(TTFont("Serif-Bold", str(FONTS / "timesbd.ttf")))
pdfmetrics.registerFont(TTFont("Serif-Italic", str(FONTS / "timesi.ttf")))
pdfmetrics.registerFont(TTFont("Serif-BoldItalic", str(FONTS / "timesbi.ttf")))
pdfmetrics.registerFontFamily("Serif", normal="Serif", bold="Serif-Bold", italic="Serif-Italic", boldItalic="Serif-BoldItalic")

BASE = 10.2
name_st = ParagraphStyle("name", fontName="Serif-Bold", fontSize=20, leading=24, alignment=TA_CENTER)
contact_st = ParagraphStyle("contact", fontName="Serif", fontSize=BASE, leading=13, alignment=TA_CENTER)
section_st = ParagraphStyle("section", fontName="Serif-Bold", fontSize=11.5, leading=14, spaceBefore=7)
body_st = ParagraphStyle("body", fontName="Serif", fontSize=BASE, leading=12.2)
bullet_st = ParagraphStyle("bullet", parent=body_st)

# ---------------------------------------------------------------- contenido
NAME = "IMELDA ALMANZA"
CONTACT = (
    "Tijuana, B.C. &nbsp;·&nbsp; almanzaaimeelda@gmail.com &nbsp;·&nbsp; "
    '<link href="https://www.linkedin.com/in/imelda-almanza">linkedin.com/in/imelda-almanza</link> &nbsp;·&nbsp; '
    '<link href="https://github.com/miel1144">github.com/miel1144</link> &nbsp;·&nbsp; '
    '<link href="https://miel1144.github.io/portfolio/">miel1144.github.io/portfolio</link>'
)

EDUCATION = [
    {
        "left": "<b>Universidad Tecnológica de Tijuana</b>",
        "right": "Tijuana, B.C.",
        "left2": "<i>Desarrollo de Software Multiplataforma</i>",
        "right2": "En curso",
        "bullets": ["2 años 3 meses de formación en programación full stack y desarrollo móvil."],
    },
]

EXPERIENCE = [
    {
        "left": "<b>Enteracloud</b>",
        "right": "",
        "left2": "<i>Desarrolladora Full Stack · Prácticas profesionales</i>",
        "right2": "Sep 2026 – Dic 2026",
        "bullets": [
            "Desarrollé en equipo <b>CosechIA</b>, plataforma vitivinícola de viñedos, ciclos, bitácoras y clima "
            "(Laravel 13, Vue 3, PostgreSQL).",
            "Construí el <b>agente de IA</b> sin frameworks: loop de razonamiento con <b>20 herramientas</b> (tool calling) "
            "validadas con JSON Schema que consultan y registran datos de campo dentro de transacciones.",
            "Implementé <b>RAG híbrido</b>: embeddings en pgvector + BM25 (tsvector) combinados con Reciprocal Rank Fusion, "
            "con respuestas fundamentadas en citas a la base de conocimiento.",
            "Diseñé memoria de corto y largo plazo, una guardia de dominio que filtra consultas antes del LLM para ahorrar tokens "
            "y un monitor proactivo programado que genera alertas sin duplicados.",
            "Respaldé el sistema con más de 100 archivos de pruebas automatizadas (Pest).",
        ],
    },
    {
        "left": "<b>Freelance</b>",
        "right": "Tijuana, B.C.",
        "left2": "<i>Desarrolladora web</i>",
        "right2": "2025 – Presente",
        "bullets": [
            "<b>Pinturas López</b> (ferretería): sitio con catálogo de productos en Django y PostgreSQL, Cloudinary y exportación a Excel.",
        ],
    },
    {
        "left": "",
        "right": "",
        "left2": "<i>Diseñadora gráfica</i>",
        "right2": "2023 – Presente",
        "bullets": [
            "Identidad visual, logotipos e ilustraciones para clientes y proyectos propios (Photoshop, Illustrator).",
        ],
    },
]

PROJECTS = [
    {
        "left": "<b>MONSE + MaquinaMonse</b> · <i>FastAPI, Django REST Framework, PostgreSQL</i>",
        "right2": "2026",
        "bullets": [
            "Monitoreo energético en tiempo real con <b>4 roles de usuario</b>: una API asíncrona simula medidores y MONSE los diagnostica.",
        ],
    },
    {
        "left": "<b>Tonalli</b> · <i>Flutter, Dart, SQLite</i>",
        "right2": "Concurso UTT 2026",
        "bullets": [
            "App offline-first que usa el luxómetro del celular para predecir la Tarifa DAC de CFE y dimensionar paneles solares.",
        ],
    },
    {
        "left": "<b>kchin</b> · <i>Django, HTMX, PWA</i>",
        "right2": "2026",
        "bullets": [
            "PWA de trazabilidad financiera para grupos de personas: registro de préstamos, pagos y saldos compartidos.",
        ],
    },
    {
        "left": "<b>ANGL · GestoLab · AdminLab</b> · <i>Django, Flutter, PostgreSQL</i>",
        "right2": "2026",
        "bullets": [
            "Gestión de laboratorios de la UTT en <b>versión web y móvil</b> con <b>3 roles</b>: asistencia, incidencias y reportes PDF.",
        ],
    },
    {
        "left": "<b>Tijuana Accesible (TJRoute)</b> · <i>Flutter, Firebase, Gemini AI</i>",
        "right2": "Hackathon Fox Coding 2026",
        "bullets": [
            "App para reportar problemas de accesibilidad urbana con foto; Gemini clasifica cada reporte y lo ubica en un mapa.",
        ],
    },
    {
        "left": "<b>note-think</b> · <i>Flutter, Riverpod, Isar</i>",
        "right2": "En desarrollo",
        "bullets": [
            "App de notas local-first: editor enriquecido, búsqueda full-text, bloqueo con biometría y exportación a PDF.",
        ],
    },
]

SKILLS = [
    ("Lenguajes", "Python, PHP, JavaScript, TypeScript, Java, Dart, SQL, HTML, CSS"),
    ("Frameworks", "Django / DRF, FastAPI, Laravel, Vue 3, Inertia.js, Flutter, HTMX, Tailwind CSS"),
    ("Bases de datos", "PostgreSQL (pgvector), MySQL, SQLite, Firebase, Supabase"),
    ("IA", "Agentes con tool calling, RAG, embeddings, búsqueda híbrida"),
    ("Control de versiones", "Git y GitHub: ramas, commits atómicos, pull requests, resolución de conflictos, GitHub Actions"),
    ("Diseño y herramientas", "Photoshop, Illustrator, Figma, Postman"),
    ("Idiomas", "Español (nativo), Inglés (B2)"),
]


# ---------------------------------------------------------------- layout
def section(title):
    return [
        Paragraph(title.upper(), section_st),
        HRFlowable(width="100%", thickness=0.7, color=black, spaceBefore=1, spaceAfter=4),
    ]


def row(left, right, bold_right=False):
    r_style = ParagraphStyle("r", parent=body_st, alignment=2)
    t = Table(
        [[Paragraph(left, body_st), Paragraph(f"<b>{right}</b>" if bold_right else right, r_style)]],
        colWidths=["74%", "26%"],
    )
    t.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                           ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                           ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return t


def bullets(items):
    if not items:
        return []
    return [ListFlowable([ListItem(Paragraph(b, bullet_st), leftIndent=12) for b in items],
                         bulletType="bullet", start="•", leftIndent=12, bulletFontSize=9, bulletOffsetY=-1.5, spaceBefore=1)]


def entry(e):
    out = []
    if e.get("left") or e.get("right"):
        out.append(row(e.get("left", ""), e.get("right", "")))
    if e.get("left2") or e.get("right2"):
        out.append(row(e.get("left2", ""), e.get("right2", "")))
    out += bullets(e.get("bullets", []))
    out.append(Spacer(1, 5))
    return out


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(OUT), pagesize=letter, leftMargin=0.7 * inch, rightMargin=0.7 * inch,
                            topMargin=0.5 * inch, bottomMargin=0.45 * inch,
                            title="Imelda Almanza — CV", author="Imelda Almanza", subject="Junior Full Stack Developer")
    story = [Paragraph(NAME, name_st), Spacer(1, 2), Paragraph(CONTACT, contact_st)]
    story += section("Educación")
    for e in EDUCATION:
        story += entry(e)
    story += section("Experiencia")
    for e in EXPERIENCE:
        story += entry(e)
    story += section("Proyectos")
    for p in PROJECTS:
        story += [row(p["left"], p["right2"])] + bullets(p["bullets"]) + [Spacer(1, 5)]
    story += section("Habilidades e idiomas")
    for k, v in SKILLS:
        story.append(Paragraph(f"<b>{k}:</b> {v}", body_st))
    doc.build(story)
    print(f"CV generado: {OUT}")


if __name__ == "__main__":
    build()
