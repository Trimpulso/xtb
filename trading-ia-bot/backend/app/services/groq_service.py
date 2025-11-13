import os
from groq import Groq

# 1. Definir la función principal para generar el código MQL5
async def generate_mql5_code(indicators: list, symbol: str, timeframe: str, strategy_type: str) -> str:
    """
    Llama a la API de Groq para generar el código MQL5 del Expert Advisor.
    """
    # ⚠️ Asegúrate de que la variable de entorno GROQ_API_KEY esté configurada
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY no está configurada en las variables de entorno.")

    client = Groq(api_key=api_key)

    # 2. Construir el Prompt Detallado (Few-shot Prompting)
    # Este es el corazón de la integración, da contexto y pide un formato específico.
    system_prompt = f"""
    Eres un programador experto en MQL5 para MetaTrader 5.
    Tu única tarea es generar el código completo de un Expert Advisor (EA)
    que cumpla estrictamente con la estrategia detallada a continuación.
    El código debe ser autónomo y compilarse sin errores en MetaEditor.
    No añadas explicaciones, comentarios innecesarios o texto adicional, SOLO el código.
    Asegúrate de incluir las directivas '//+--' y '//+--' y el encabezado de un EA.

    Requisitos:
    - Plataforma: MetaTrader 5 (MQL5).
    - Gestión de riesgo: Usar un Stop Loss de 200 puntos y un Take Profit de 400 puntos.
    - Operaciones: Solo una operación abierta a la vez por símbolo.
    """

    user_request = f"""
    Genera un Expert Advisor para el símbolo '{symbol}' y el timeframe '{timeframe}'.
    La estrategia es de tipo '{strategy_type}' y debe basarse en los siguientes indicadores técnicos:
    {', '.join(indicators)}.

    Escribe la lógica de entrada y salida basada en una combinación lógica y estándar de estos indicadores.
    Por ejemplo:
    - COMPRA si la tendencia es alcista (según el primer indicador) y el impulso es positivo (según el segundo indicador).
    - VENTA en caso contrario.
    """
    
    # 3. Llamada a la API de Groq
    try:
        completion = client.chat.completions.create(
            # 'mixtral-8x7b-32768' es un modelo rápido y bueno para código
            model="mixtral-8x7b-32768", 
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_request}
            ],
            # Configuraciones para obtener mejor código
            temperature=0.1,  # Baja temperatura para código más determinista
            max_tokens=4096   # Máximo de tokens para asegurar el código completo
        )
        
        mql5_code = completion.choices[0].message.content
        
        # 4. Limpieza básica del código (eliminar texto de introducción/cierre)
        # Esto ayuda a asegurar que solo se retorna el código.
        if mql5_code.startswith("```mql5"):
            mql5_code = mql5_code.replace("```mql5", "").strip()
        if mql5_code.endswith("```"):
            mql5_code = mql5_code.replace("```", "").strip()
            
        return mql5_code
        
    except Exception as e:
        # Manejo de errores de la API (ej. clave no válida, límite excedido)
        return f"ERROR_GROQ: No se pudo generar el código. Detalle: {e}"


# 2. Función para refinar código si tiene errores
async def refine_mql5_code(code: str, error_message: str) -> str:
    """
    Refina el código MQL5 si tiene errores de compilación.
    Toma el código anterior y el error, y retorna el código corregido.
    """
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY no está configurada en las variables de entorno.")

    client = Groq(api_key=api_key)

    system_prompt = """
    Eres un experto en MQL5 y debugging.
    Tu tarea es REESCRIBIR el código MQL5 completo, línea por línea,
    corrigiendo los errores de compilación proporcionados.
    Retorna SOLO el código MQL5 corregido, sin explicaciones adicionales.
    """

    user_request = f"""
    El siguiente código MQL5 tiene errores de compilación:
    
    ERROR: {error_message}
    
    CÓDIGO CON ERRORES:
    {code}
    
    Por favor, reescribe el código COMPLETAMENTE, corrigiendo estos errores.
    Retorna SOLO el código, nada más.
    """
    
    try:
        completion = client.chat.completions.create(
            model="mixtral-8x7b-32768",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_request}
            ],
            temperature=0.1,
            max_tokens=4096
        )
        
        refined_code = completion.choices[0].message.content
        
        # Limpieza
        if refined_code.startswith("```mql5"):
            refined_code = refined_code.replace("```mql5", "").strip()
        if refined_code.endswith("```"):
            refined_code = refined_code.replace("```", "").strip()
            
        return refined_code
        
    except Exception as e:
        return f"ERROR_GROQ_REFINE: No se pudo refinar el código. Detalle: {e}"


# --- Ejemplo de uso (NO para el archivo principal) ---
# Si ejecutas este archivo directamente, mostrará un ejemplo
if __name__ == '__main__':
    import asyncio

    async def main():
        # Configuramos la variable de entorno para la prueba (REEMPLAZAR CON TU CLAVE REAL)
        os.environ["GROQ_API_KEY"] = "gsk_xxxxxxx" 
        
        print("Generando código MQL5 para EURUSD (Tendencia)...")
        
        code = await generate_mql5_code(
            indicators=["ADX", "RSI"],
            symbol="EURUSD",
            timeframe="H1",
            strategy_type="Tendencia con momentum"
        )
        
        print("\n--- CÓDIGO MQL5 GENERADO ---\n")
        print(code)
        print("\n---------------------------\n")

    # asyncio.run(main())
