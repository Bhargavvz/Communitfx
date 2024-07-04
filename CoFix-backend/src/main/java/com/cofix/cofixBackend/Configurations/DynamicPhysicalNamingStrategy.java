package com.cofix.cofixBackend.Configurations;

import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.naming.PhysicalNamingStrategy;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * It is copied from {@link org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl}
 */
@Component
public class DynamicPhysicalNamingStrategy implements PhysicalNamingStrategy, ApplicationContextAware {
    private final Pattern VALUE_PATTERN = Pattern.compile("^\\$\\{([\\w.]+)}$");
    private Environment environment;

    @Override
    public Identifier toPhysicalCatalogName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return apply(name, jdbcEnvironment);
    }

    @Override
    public Identifier toPhysicalSchemaName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return apply(name, jdbcEnvironment);
    }

    @Override
    public Identifier toPhysicalTableName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return apply(name, jdbcEnvironment);
    }

    @Override
    public Identifier toPhysicalSequenceName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return apply(name, jdbcEnvironment);
    }

    @Override
    public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return apply(name, jdbcEnvironment);
    }

    private Identifier apply(Identifier name, JdbcEnvironment jdbcEnvironment) {
        if (name == null) {
            return null;
        }

        // Custom Implementation Start
        String text = name.getText();
        Matcher matcher = VALUE_PATTERN.matcher(text);
        if (matcher.matches()) {
            String propertyKey = matcher.group(1);
            text = environment.getProperty(propertyKey);
            Assert.notNull(text, "Property is not found '" + propertyKey + "'");

            // extract catalog selection part
            // Example:
            // Current Catalog: TESTDB
            // Property: TESTDB:TestUser, TESTDB2:TestUser
            // Text will be TestUser
            Pattern catalogPattern = Pattern.compile(jdbcEnvironment.getCurrentCatalog().getText() + ":([^,]+)");
            Matcher catalogMatcher = catalogPattern.matcher(text);
            if (catalogMatcher.find()) {
                text = catalogMatcher.group(1);
            }

            // Caution: You can remove below return function, if so text will be transformed with spring advice
            return getIdentifier(text, name.isQuoted(), jdbcEnvironment);
        }
        // Custom Implementation End


        StringBuilder builder = new StringBuilder(text.replace('.', '_'));
        for (int i = 1; i < builder.length() - 1; i++) {
            if (isUnderscoreRequired(builder.charAt(i - 1), builder.charAt(i), builder.charAt(i + 1))) {
                builder.insert(i++, '_');
            }
        }
        return getIdentifier(builder.toString(), name.isQuoted(), jdbcEnvironment);
    }

    /**
     * Get an identifier for the specified details. By default this method will return an
     * identifier with the name adapted based on the result of
     * {@link #isCaseInsensitive(JdbcEnvironment)}
     *
     * @param name            the name of the identifier
     * @param quoted          if the identifier is quoted
     * @param jdbcEnvironment the JDBC environment
     * @return an identifier instance
     */
    protected Identifier getIdentifier(String name, boolean quoted, JdbcEnvironment jdbcEnvironment) {
        if (isCaseInsensitive(jdbcEnvironment)) {
            name = name.toLowerCase(Locale.ROOT);
        }
        return new Identifier(name, quoted);
    }

    /**
     * Specify whether the database is case sensitive.
     *
     * @param jdbcEnvironment the JDBC environment which can be used to determine case
     * @return true if the database is case insensitive sensitivity
     */
    protected boolean isCaseInsensitive(JdbcEnvironment jdbcEnvironment) {
        return true;
    }

    private boolean isUnderscoreRequired(char before, char current, char after) {
        return Character.isLowerCase(before) && Character.isUpperCase(current) && Character.isLowerCase(after);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        environment = applicationContext.getBean(Environment.class);
    }
}