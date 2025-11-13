#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# INSTALACIÓN AUTOMÁTICA - Trading IA Bot (macOS/Linux)
# ═══════════════════════════════════════════════════════════════════════════════

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Función para mostrar mensajes con color
print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Parsear argumentos
INSTALL_BACKEND=false
INSTALL_FRONTEND=false
INSTALL_ALL=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -backend|--backend)
            INSTALL_BACKEND=true
            shift
            ;;
        -frontend|--frontend)
            INSTALL_FRONTEND=true
            shift
            ;;
        -all|--all)
            INSTALL_ALL=true
            shift
            ;;
        *)
            shift
            ;;
    esac
done

# Si --all, instalar ambos
if [ "$INSTALL_ALL" = true ]; then
    INSTALL_BACKEND=true
    INSTALL_FRONTEND=true
fi

# Obtener directorio del proyecto
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
print_info "Directorio del proyecto: $PROJECT_ROOT"

# ═══════════════════════════════════════════════════════════════════════════════
# BACKEND
# ═══════════════════════════════════════════════════════════════════════════════

if [ "$INSTALL_BACKEND" = true ] || [ "$INSTALL_ALL" = true ]; then
    echo ""
    echo -e "${GREEN}🔧 INSTALANDO BACKEND...${NC}"
    echo ""
    
    BACKEND_PATH="$PROJECT_ROOT/backend"
    
    # Verificar que Python está instalado
    if ! command -v python3 &> /dev/null; then
        print_error "Python3 no está instalado"
        echo "Por favor instala Python desde https://www.python.org/"
        exit 1
    fi
    
    print_info "Python version: $(python3 --version)"
    
    # Crear entorno virtual si no existe
    if [ ! -d "$BACKEND_PATH/venv" ]; then
        print_info "Creando entorno virtual..."
        cd "$BACKEND_PATH"
        python3 -m venv venv
    else
        print_info "Entorno virtual encontrado"
    fi
    
    # Activar entorno virtual
    print_info "Activando entorno virtual..."
    source "$BACKEND_PATH/venv/bin/activate"
    
    # Instalar dependencias
    print_info "Instalando paquetes Python..."
    pip install --upgrade pip
    pip install -r "$BACKEND_PATH/requirements.txt"
    
    # Crear archivo .env si no existe
    if [ ! -f "$BACKEND_PATH/.env" ]; then
        print_info "Creando archivo .env..."
        cat > "$BACKEND_PATH/.env" << 'EOF'
# ═══════════════════════════════════════════════════════════════════════════════
# CONFIGURACIÓN DEL BACKEND - Trading IA Bot
# ═══════════════════════════════════════════════════════════════════════════════

# GROQ API Key (obtener en https://console.groq.com)
GROQ_API_KEY=

# Database
DATABASE_URL=sqlite:///./database.db

# Server
SERVER_PORT=8000
DEBUG=true
EOF
        
        print_warning "Debes actualizar GROQ_API_KEY en $BACKEND_PATH/.env"
        print_warning "Instrucciones:"
        echo "  1. Ve a https://console.groq.com"
        echo "  2. Copia tu API Key"
        echo "  3. Edita $BACKEND_PATH/.env"
        echo "  4. Pega: GROQ_API_KEY=gsk_xxxxxxxxxxxxx"
    fi
    
    print_success "Backend instalado correctamente"
    echo ""
fi

# ═══════════════════════════════════════════════════════════════════════════════
# FRONTEND
# ═══════════════════════════════════════════════════════════════════════════════

if [ "$INSTALL_FRONTEND" = true ] || [ "$INSTALL_ALL" = true ]; then
    echo ""
    echo -e "${GREEN}🎨 INSTALANDO FRONTEND...${NC}"
    echo ""
    
    FRONTEND_PATH="$PROJECT_ROOT/frontend"
    
    # Verificar que npm está instalado
    if ! command -v npm &> /dev/null; then
        print_error "npm no está instalado"
        echo "Por favor instala Node.js desde https://nodejs.org/"
        exit 1
    fi
    
    print_info "npm version: $(npm --version)"
    print_info "node version: $(node --version)"
    
    # Instalar dependencias
    print_info "Instalando paquetes npm..."
    cd "$FRONTEND_PATH"
    npm install
    
    print_success "Frontend instalado correctamente"
    echo ""
fi

# ═══════════════════════════════════════════════════════════════════════════════
# RESUMEN
# ═══════════════════════════════════════════════════════════════════════════════

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✨ INSTALACIÓN COMPLETADA${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo ""

print_info "PRÓXIMOS PASOS:"
echo "1. Obtener GROQ_API_KEY: https://console.groq.com"
echo "2. Actualizar backend/.env con tu API Key"
echo "3. Ejecutar backend:"
echo "   cd backend && source venv/bin/activate && python -m uvicorn app.main:app --reload --port 8000"
echo "4. En otra terminal, ejecutar frontend:"
echo "   cd frontend && npm run dev"
echo "5. Abrir en navegador: http://localhost:5173"
echo ""

echo -e "${CYAN}📚 DOCUMENTACIÓN:${NC}"
echo "• README.md - Quick start"
echo "• PROJECT_STRUCTURE.md - Arquitectura completa"
echo "• INDEX.txt - Índice de referencia"
echo "• EXECUTE_FROM_GITHUB.md - Guía detallada"
echo ""

print_success "¡Instalación lista!"
echo ""
